<template>
  <DxForm
    :col-count="1"
    :read-only="!canUpdate"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-count="2" :caption="$t('shared.fromWhom')">
      <DxSimpleItem
        :col-span="2"
        data-field="correspondentId"
        template="correspondent"
      >
        <DxLabel location="left" :text="$t('document.fields.counterPart')" />
        <DxRequiredRule
          :message="$t('document.validation.counterPartRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="dated"
        :editor-options="datedOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.dated')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="inNumber" :editor-options="inNumberOptions">
        <DxLabel location="left" text="№" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        data-field="inResponseToId"
        :editor-options="inResponseToIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.inResponseToId')" />
      </DxSimpleItem>
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
    <DxGroupItem :col-count="2" :caption="$t('shared.whom')">
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
        <DxRequiredRule
          :message="$t('document.validation.departmentIdRequired')"
        />
      </DxSimpleItem>

      <DxSimpleItem data-field="addresseeId" template="addressee">
        <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="assigneeId" template="assignee">
        <DxLabel location="left" :text="$t('document.fields.assigneeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #correspondent>
      <custom-select-box
        value-expr="id"
        :readOnly="readOnly"
        :validatorGroup="documentValidatorName"
        @valueChanged="setCorrenspondent"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        messageRequired="document.validation.counterPartRequired"
        :value="correspondentId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :disabled="!isCompany || readOnly"
        :correspondentId="correspondentId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :disabled="!isCompany || readOnly"
        :correspondentId="correspondentId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #addressee>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :value="addresseeId"
        @valueChanged="setAddresseeId"
      />
    </template>
    <template #assignee>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :value="assigneeId"
        @valueChanged="setAssigneeId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="isRegistered && !canUpdate"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged=" (data) => {
                        setBusinessUnitId(data); 
                        setAddresseeId(null);
                        setDepartamentId('')
                    } "
      />
    </template>
  </DxForm>
</template>
<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";
import Status from "~/infrastructure/constants/status";
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
    BusinessUnitSelectBox,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  data() {
    return {
      selectedCorrespondentType: null,
    };
  },
  computed: {
    businessUnitId() {
      return this.document.businessUnitId;
    },
    assigneeId() {
      return this.document.assigneeId;
    },
    addresseeId() {
      return this.document.addresseeId;
    },
    departmentId() {
      return this.document.departmentId;
    },
    contactId() {
      return this.document.contactId;
    },
    correspondentId() {
      return this.document.correspondentId;
    },
    counterpartySignatoryId() {
      return this.document.counterpartySignatoryId;
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
    deliveryMethodOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.MailDeliveryMethod,
        }),
        value: this.document.deliveryMethodId,
        onValueChanged: (e) => {
          this.setSetDeliveryMethodId(e.value)
        }
      };
    },
    deparmentOptions() {
      let businessUnitId = this.$store.getters[`documents/${this.documentId}/document`].businessUnitId;
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [["businessUnitId", "=", businessUnitId],"and",["status", "=", Status.Active]]
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.setDepartamentId(e.value)
          this.setAddresseeId(null)
        }
      };
    },
    inResponseToIdOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(`${dataApi.documentModule.Documents}${DocumentQuery.OutgoingLetter}`)
        .filter(this.correspondentId ? ["correspondentId", "=", this.correspondentId] : [])
        .acceptCustomValues((e) => {e.customItem = null})
        .withoutDeferRendering()
        .focusStateDisabled()
        .clearValueExpr()
        .build(this);
      return {
        readOnly: !this.correspondentId,
        ...options,
        value: this.document.inResponseTo,
        onValueChanged: (e) => {
          this.setInResponseToId(e.value?.id)
        },
      };
    },
    inNumberOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({context: this}),
        value: this.document.inNumber,
        onValueChanged: (e) => {
          this.setInNumber(e.value)
        },
      };
    },
    datedOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({context: this}),
        value: this.document.dated,
        onValueChanged: (e) => {
          this.setDated(e.value)
        },
      };
    },
  },
    methods: {
    setCorrenspondent(data) {
      if (data == null) {
        if (this.selectedCorrespondentType){
          this.selectedCorrespondentType.type = null;
        }
      }
      this.dispatchCorrespondent(data)
      this.setContact(null);
      this.setCounterpartySignatoryId(null);
      this.setInResponseToId(null)
    },
    setContact(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CONTACT_ID`, data && data.id);
    },
    setSetDeliveryMethodId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DELIVERY_METHOD_ID`,data)
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`, data && data.id);
    },
    setInResponseToId(data) {
      this.$store.commit(`documents/${this.documentId}/IN_RESPONSE_TO_ID`, data)
    },
    setInNumber(data) {
      this.$store.commit(`documents/${this.documentId}/IN_NUMBER`, data);
    },
    setDated(data) {
      this.$store.commit(`documents/${this.documentId}/DATED`, data);
    },
    setAddresseeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data);
    },
    setAssigneeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE_ID`, data);
    },
    setDepartamentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`,data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
    dispatchCorrespondent(data) {
      this.$store.dispatch(`documents/${this.documentId}/setCorrespondent`, data);
    },
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
  },
};
</script>

