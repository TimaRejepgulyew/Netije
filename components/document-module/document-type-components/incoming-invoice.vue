<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.account')">
      <DxSimpleItem
        :isRequired="true"
        data-field="number"
        :editor-options="numberOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.accountNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        data-field="date"
        :editor-options="dateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.accountDate')" />
      </DxSimpleItem>

      <DxSimpleItem
        :isRequired="true"
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.currencyId')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem
      :col-span="2"
      :col-count="1"
      :caption="$t('document.fields.counterPart')"
    >
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="left" :text="$t('document.fields.counterPart')" />
        <DxRequiredRule
          :message="$t('document.validation.counterPartRequired')"
        />
      </DxSimpleItem>
      >
      <DxSimpleItem
        data-field="leadingDocument"
        :col-span="2"
        template="leadingDocument"
      >
        <DxLabel location="left" :text="$t('document.fields.contract')" />
        <DxRequiredRule :message="$t('document.validation.contractRequired')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem data-field="businessUnit" template="businessUnitSelectBox">
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
        <DxRequiredRule
          :message="$t('document.validation.businessUnitIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem data-field="department" template="departmentSelectBox">
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
        <DxRequiredRule
          :message="$t('document.validation.departmentIdRequired')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <template #leadingDocument>
      <customSelectBoxDocument
        :readOnly="leadingDocumentOptions.readOnly"
        :dataSourceFilter="leadingDocumentOptions.dataSourceFilter"
        :dataSourceQuery="leadingDocumentOptions.dataSourceQuery"
        :validationGroup="documentValidatorName"
        :value="document.leadingDocument"
        :isRequired="true"
        @valueChanged="setLeadingDocument"
      />
    </template>
    <template #counterparty>
      <custom-select-box
        value-expr="id"
        :readOnly="readOnly"
        :validatorGroup="documentValidatorName"
         :isRequired="true"
        @valueChanged="
          (data) => {
            setCounterparty(data);
            setLeadingDocument(null);
          }
        "
        messageRequired="document.validation.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="businessUnit"
        @valueChanged="
          (data) => {
            setBusinessUnit(data);
            setDepartment(null);
          }
        "
      />
    </template>
    <template #departmentSelectBox>
      <department-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="department"
        :businessUnitId="businessUnitId"
        @valueChanged="
          (data) => {
            setDepartment(data);
          }
        "
      />
    </template>
  </DxForm>
</template>
<script>
import customSelectBoxDocument from "~/components/document/select-box/index.vue";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    customSelectBox,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
    customSelectBoxDocument,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    counterpartyId() {
      return this.document.counterpartyId;
    },
    department() {
      return this.document.department;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    businessUnitId() {
      return this.document.businessUnit?.id;
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    numberOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.number,
        onValueChanged: (e) => {
          this.setNumber(e.value);
        },
      };
    },
    dateOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.document.date,
        onValueChanged: (e) => {
          this.setDate(e.value);
        },
      };
    },
    leadingDocumentOptions() {
      return {
        readOnly: !this.counterpartyId || this.readOnly,
        dataSourceQuery: DocumentQuery.Contract,
        dataSourceFilter: this.counterpartyId
          ? ["counterpartyId", "=", this.counterpartyId]
          : undefined,
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", Status.Active],
        }),
        readOnly: this.readOnly,
        value: this.document.currencyId,
        onValueChanged: (e) => {
          this.setCurrencyId(e.value);
        },
      };
    },
    totalAmountOptions() {
      return {
        format: "#,##0.00",
        readOnly: this.readOnly,
        value: this.document.totalAmount,
        onValueChanged: (e) => {
          this.setTotalAmount(e.value);
        },
      };
    },
  },
  methods: {
    setCounterparty(data) {
      this.$store.commit(`documents/${this.documentId}/SET_COUNTERPARTY`, data);
    },
    setBusinessUnit(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_BUSINESS_UNIT`,
        data
      );
    },
    setDepartment(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT`, data);
    },
    setTotalAmount(data) {
      this.$store.commit(`documents/${this.documentId}/SET_TOTAL_AMOUNT`, data);
    },
    setDepartment(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT`, data);
    },
    setCurrencyId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CURRENCY_ID`, data);
    },
    setLeadingDocument(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setLeadingDocument`,
        data
      );
    },
    setDate(data) {
      this.$store.commit(`documents/${this.documentId}/DATE`, data);
    },
    setNumber(data) {
      this.$store.commit(`documents/${this.documentId}/NUMBER`, data);
    },
  },
};
</script>
