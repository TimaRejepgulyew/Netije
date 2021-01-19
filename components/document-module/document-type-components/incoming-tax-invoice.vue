<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem
      data-field="leadingDocument"
      :col-span="2"
      template="leadingDocument"
    >
      <DxLabel location="left" :text="$t('document.fields.contract')" />
      <DxRequiredRule :message="$t('document.validation.contractRequired')" />
    </DxSimpleItem>
    <DxGroupItem :col-span="2" :col-count="2">
      <DxSimpleItem
        :col-span="1"
        data-field="isAdjustment"
        editor-type="dxCheckBox"
        :editor-options="isAdjustmentOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.isAdjustment')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="corrected"
        :visible="isAdjustment"
        :isRequired="isAdjustment"
        template="corrected"
      >
        <DxLabel location="left" :text="$t('document.fields.corrected')" />
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
    <DxGroupItem
      :col-span="2"
      :col-count="2"
      :caption="$t('shared.conditions')"
    >
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
    <template #corrected>
      <customSelectBoxDocument
        :readOnly="correctedOptions.readOnly"
        :dataSourceFilter="correctedOptions.dataSourceFilter"
        :dataSourceQuery="correctedOptions.dataSourceQuery"
        :validationGroup="documentValidatorName"
        :value="document.corrected"
        :isRequired="isAdjustment"
        @valueChanged="setCorrected"
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
    <template #businessUnitSelectBox>
      <business-unit-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
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
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import QuickFilter from "~/infrastructure/constants/quickFilter/documentQuiсkFilter";
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
    customSelectBoxContact,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
    customSelectBoxDocument,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
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
    businessUnit() {
      return this.document.businessUnit;
    },
    businessUnitId() {
      return this.document.businessUnit?.id;
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
    contactId() {
      return this.document.contactId;
    },
    counterpartySignatoryId() {
      return this.document.counterpartySignatoryId;
    },
    ourSignatory() {
      return this.document.ourSignatory;
    },
    responsibleEmployee() {
      return this.document.responsibleEmployee;
    },
    isAdjustment() {
      return this.document.isAdjustment;
    },
    validTill() {
      return this.document.validTill;
    },
    isAdjustmentOptions() {
      return {
        readOnly: this.readOnly,
        value: this.isAdjustment,
        onValueChanged: (e) => {
          this.setIsAdjustment(e.value);
          this.setCorrected(null);
        },
      };
    },
    correctedOptions() {
      return {
        readOnly: !this.counterpartyId || this.readOnly,
        dataSourceQuery: DocumentQuery.IncomingTaxInvoice,
        dataSourceFilter: this.counterpartyId
          ? ["counterpartyId", "=", this.counterpartyId]
          : undefined,
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
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        format: "#,##0.00",
        readOnly: this.readOnly,
        value: this.document.totalAmount,
        onValueChanged: (e) => {
          this.setTotalAmount(e.value);
        },
      };
    },
    validFromOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.validFrom,
        onValueChanged: (e) => {
          this.setValidFrom(null);
        },
      };
    },
    validTillOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.validTill,
        onValueChanged: (e) => {
          this.setValidTill(e.value);
        },
      };
    },
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
      this.setCorrected(null);
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
    setCorrected(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CORRECTED`, data);
    },
    setLeadingDocument(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setLeadingDocument`,
        data
      );
    },
    setContact(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_CONTACT_ID`,
        data && data.id
      );
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`,
        data && data.id
      );
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE`, data);
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
    setValidTill(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_TILL`, data);
    },
    setValidFrom(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_FROM`, data);
    },
    setTotalAmount(data) {
      this.$store.commit(`documents/${this.documentId}/SET_TOTAL_AMOUNT`, data);
    },
    setCurrencyId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CURRENCY_ID`, data);
    },
    setIsAdjustment(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_IS_ADJUSTMENT`,
        data
      );
    },
  },
};
</script>
