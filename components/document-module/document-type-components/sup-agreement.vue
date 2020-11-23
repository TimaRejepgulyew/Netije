<template>
  <DxForm
    :col-count="2"
    :readOnly="readOnly"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem
      :col-span="2"
      data-field="isStandard"
      editor-type="dxCheckBox"
      :editor-options="isStandardOptions"
    >
      <DxLabel
        location="left"
        :text="$t('document.fields.isStandardSupAgreement')"
      />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="leadingDocumentId"
      :col-span="2"
      template="leadingDocument"
    >
      <DxLabel location="left" :text="$t('document.fields.contract')" />
      <DxRequiredRule :message="$t('document.validation.contractRequired')" />
    </DxSimpleItem>

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
      <DxGroupItem :col-count="2">
        <DxSimpleItem
          data-field="counterpartySignatoryId"
          template="counterPartSignatury"
        >
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="contactId" template="contact">
          <DxLabel location="left" :text="$t('document.fields.contactId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>

    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem
        data-field="businessUnitId"
        template="businessUnitSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
        <DxRequiredRule
          :message="$t('document.validation.businessUnitIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem data-field="departmentId" template="departmentSelectBox">
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
        <DxRequiredRule
          :message="$t('document.validation.departmentIdRequired')"
        />
      </DxSimpleItem>

      <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
        <DxLabel location="left" :text="$t('document.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem
        template="responsibleEmployee"
        data-field="responsibleEmployeeId"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.responsibleEmployeeId')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem
      :col-span="2"
      :col-count="2"
      :caption="$t('shared.conditions')"
    >
      <DxSimpleItem
        data-field="validFrom"
        :editor-options="validFromOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.validFrom')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="validTill"
        :editor-options="validTillOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.validTill')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.currencyId')" />
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
        :readOnly="readOnly"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        :validatorGroup="documentValidatorName"
        @valueChanged="setCounterparty"
        messageRequired="document.validation.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :readOnly="readOnly"
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :readOnly="readOnly"
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :readOnly="readOnly"
        valueExpr="id"
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #responsibleEmployee>
      <employee-select-box
        :readOnly="readOnly"
        valueExpr="id"
        :value="responsibleEmployeeId"
        @valueChanged="setResponsibleEmployeeId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged="
          data => {
            setBusinessUnitId(data);
            setAddresseeId(null);
            setDepartmentId(null);
          }
        "
      />
    </template>
    <template #departmentSelectBox>
      <department-select-box
        valueExpr="id"
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :value="departmentId"
        :businessUnitId="businessUnitId"
        @valueChanged="
          data => {
            setDepartmentId(data);
            setAddresseeId(null);
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
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    customSelectBox,
    customSelectBoxContact,
    employeeSelectBox,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
    customSelectBoxDocument
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
      validatorGroup: "OfficialDocument"
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    counterpartyId() {
      return this.document.counterpartyId;
    },
    departmentId() {
      return this.document.departmentId;
    },
    contactId() {
      return this.document.contactId;
    },
    counterpartySignatoryId() {
      return this.document.counterpartySignatoryId;
    },
    ourSignatoryId() {
      return this.document.ourSignatoryId;
    },
    responsibleEmployeeId() {
      return this.document.responsibleEmployeeId;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    validTill() {
      return this.document.validTill;
    },
    isStandardOptions() {
      return {
        readOnly: this.readOnly,
        value: this.document.isStandard,
        onValueChanged: e => {
          this.setIsStandard(e.value);
        }
      };
    },
    leadingDocumentOptions() {
      return {
        readOnly: !this.counterpartyId || this.readOnly,
        dataSourceQuery: DocumentQuery.Contract,
        dataSourceFilter: this.counterpartyId
          ? ["counterpartyId", "=", this.counterpartyId]
          : undefined
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", Status.Active]
        }),
        readOnly: this.readOnly,
        value: this.document.currencyId,
        onValueChanged: e => {
          this.setCurrencyId(e.value);
        }
      };
    },
    totalAmountOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        format: "#,##0.00",
        readOnly: this.readOnly,
        value: this.document.totalAmount,
        onValueChanged: e => {
          this.setTotalAmount(e.value);
        }
      };
    },
    validFromOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.document.validFrom,
        onValueChanged: e => {
          this.setValidFrom(e.value);
        }
      };
    },
    validTillOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.validTill,
        onValueChanged: e => {
          this.setValidTill(e.value);
        }
      };
    }
  },
  methods: {
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
    setCounterparty(data) {
      if (data == null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.dispatchCounterparty(data);
      this.setLeadingDocument(null);
      this.setContact(null);
      this.setCounterpartySignatoryId(null);
    },
    dispatchCounterparty(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setCounterparty`,
        data
      );
    },
    setContact(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_CONTACT_ID`,
        data && data.id
      );
    },
    setLeadingDocument(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setLeadingDocument`,
        data
      );
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`,
        data && data.id
      );
    },
    setOurSignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
        data
      );
    },
    setResponsibleEmployeeId(data) {
      return this.$store.commit(
        `documents/${this.documentId}/SET_RESPONSIBLE_EMPLOYEE_ID`,
        data
      );
    },
    setAddresseeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,
        data
      );
    },
    setDepartmentId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DEPARTMENT_ID`,
        data
      );
    },
    setValidTill(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_TILL`, data);
    },
    setValidFrom(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_FROM`, data);
    },
    setTotalAmount(data) {
      this.$store.commit(`documents/${this.documentId}/SET_TOTAL_AMOUNT`, data);
    },
    setIsStandard(data) {
      this.$store.commit(`documents/${this.documentId}/SET_IS_STANDARD`, data);
    },
    setCurrencyId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CURRENCY_ID`, data);
    }
  }
};
</script>
