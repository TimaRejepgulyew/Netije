<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem
      :col-span="2"
      data-field="leadingDocumentId"
      editor-type="dxSelectBox"
      :editor-options="leadingDocumentOptions"
    >
      <DxLabel location="left" :text="$t('document.fields.contract')" />
    </DxSimpleItem>
    <DxGroupItem :col-span="2" :col-count="1" :caption="$t('document.fields.counterPart')">
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="left" :text="$t('document.fields.counterPart')" />
        <DxRequiredRule :message="$t('document.validation.counterPartRequired')" />
      </DxSimpleItem>
      <DxGroupItem :visible="isCompany" :col-count="2">
        <DxSimpleItem data-field="counterpartySignatoryId" template="counterPartSignatury">
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
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="deparmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
        <DxRequiredRule :message="$t('document.validation.departmentIdRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
        <DxLabel location="left" :text="$t('document.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem template="responsibleEmployee" data-field="responsibleEmployeeId">
        <DxLabel location="left" :text="$t('document.fields.responsibleEmployeeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.conditions')">
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
    <template #counterparty>
      <custom-select-box
        @selectionChanged="handlerCorrespondentSelectionChanged"
        :validatorGroup="documentValidatorName"


        @valueChanged="setCounterparty"
        messageRequired="document.validation.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :correspondentId="counterpartyId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :correspondentId="counterpartyId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #responsibleEmployee>
      <employee-select-box
        valueExpr="id"
        :value="responsibleEmployeeId"
        @valueChanged="setResponsibleEmployeeId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="isRegistered"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged="(data) => {
                        setBusinessUnitId(data); 
                        setAddresseeId(null);
                        setDepartmentId(null)
                    } "
      />
    </template>
  </DxForm>
</template>
<script>
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
    employeeSelectBox,
    BusinessUnitSelectBox
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
    businessUnitId() {
      return this.document.businessUnitId;
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
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
    validTill() {
      return this.document.validTill;
    },
    responsibleEmployeeId() {
      return this.document.responsibleEmployeeId;
    },
    leadingDocumentOptions() {
      return {
        readOnly: !this.counterpartyId,
        deferRendering: false,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.documentModule.Documents}${DocumentQuery.Contract}`,
          filter: this.counterpartyId ? ["counterpartyId", "=", this.counterpartyId] : [],
        }),
        value: this.document.leadingDocumentId,
        onValueChanged: (e) => {
          this.setLeadingDocumentId(e.value)
        },
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", Status.Active],
        }),
        readOnly: this.isRegistered,
        value: this.document.currencyId,
        onValueChanged: (e) => {
          this.setCurrencyId(e.value)
        },
      };
    },
    totalAmountOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        format: "#,##0.00",
        readOnly: this.isRegistered,
        value: this.document.totalAmount,
        onValueChanged: (e) => {
          this.setTotalAmount(e.value)
        },
      };
    },
    validFromOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.validFrom,
        onValueChanged: (e) => {
          this.setValidFrom(null)
        },
      };
    },
    validTillOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.validTill,
        onValueChanged: (e) => {
          this.setValidTill(e.value)
        },
      };
    },
    deparmentOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.setDepartmentId(e.value)
          this.setAddresseeId(null)
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
      this.dispatchCounterparty(data)
      this.setLeadingDocumentId(null)
      this.setContact(null)
      this.setCounterpartySignatoryId(null)
    },
    setLeadingDocumentId(data) {
      this.$store.dispatch(`documents/${this.documentId}/setLeadingDocumentId`, data);
    },
    dispatchCounterparty(data) {
      this.$store.dispatch(`documents/${this.documentId}/setCounterparty`, data);
    },
    setContact(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CONTACT_ID`, data && data.id);
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`, data && data.id);
    },
    setOurSignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_OUR_SIGNATORY_ID`, data);
    },
    setResponsibleEmployeeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_RESPONSIBLE_EMPLOYEE_ID`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
    setAddresseeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data);
    },
    setDepartmentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`,data);
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
  },
};
</script>

