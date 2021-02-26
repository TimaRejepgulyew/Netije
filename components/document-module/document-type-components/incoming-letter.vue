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
        template="inResponseTo"
        :col-span="2"
        data-field="inResponseToId"
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

      <DxSimpleItem data-field="addressee" template="addressee">
        <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="assignee" template="assignee">
        <DxLabel location="left" :text="$t('document.fields.assigneeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #inResponseTo>
      <customSelectBoxDocument
        :readOnly="inResponseToOptions.readOnly"
        :dataSourceFilter="inResponseToOptions.dataSourceFilter"
        :dataSourceQuery="inResponseToOptions.dataSourceQuery"
        :validationGroup="documentValidatorName"
        :isRequired="false"
        :value="document.inResponseTo"
        @valueChanged="setInResponseTo"
      />
    </template>
    <template #correspondent>
      <custom-select-box
        value-expr="id"
        :readOnly="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
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
        :read-only="!canUpdate"
        :value="addressee"
        @valueChanged="setAddressee"
      />
    </template>
    <template #assignee>
      <employee-select-box
        :read-only="readOnly"
        :value="assignee"
        @valueChanged="setAssignee"
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
            setAddressee(null);
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
            setAddressee(null);
          }
        "
      />
    </template>
  </DxForm>
</template>
<script>
import customSelectBoxDocument from "~/components/document/select-box/index.vue";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
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
    customSelectBoxDocument,
    employeeSelectBox,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
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
      return this.document.businessUnit?.id;
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    assignee() {
      return this.document.assignee;
    },
    addressee() {
      return this.document.addressee;
    },
    department() {
      return this.document.department;
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
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
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
          this.setSetDeliveryMethodId(e.value);
        },
      };
    },
    inResponseToOptions() {
      return {
        readOnly: !this.correspondentId || this.readOnly,
        dataSourceQuery: DocumentQuery.OutgoingLetter,
        dataSourceFilter: this.correspondentId
          ? ["correspondentId", "=", this.correspondentId]
          : undefined,
      };
    },

    inNumberOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.inNumber,
        onValueChanged: (e) => {
          this.setInNumber(e.value);
        },
      };
    },
    datedOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.document.dated,
        onValueChanged: (e) => {
          this.setDated(e.value);
        },
      };
    },
  },
  methods: {
    setCorrenspondent(data) {
      if (data == null) {
        if (this.selectedCorrespondentType) {
          this.selectedCorrespondentType.type = null;
        }
      }
      this.dispatchCorrespondent(data);
      this.setContact(null);
      this.setCounterpartySignatoryId(null);
      this.setInResponseTo(null);
    },
    setContact(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_CONTACT_ID`,
        data && data.id
      );
    },
    setSetDeliveryMethodId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DELIVERY_METHOD_ID`,
        data
      );
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`,
        data && data.id
      );
    },
    setInResponseTo(data) {
      this.$store.commit(`documents/${this.documentId}/IN_RESPONSE_TO`, data);
    },
    setInNumber(data) {
      this.$store.commit(`documents/${this.documentId}/IN_NUMBER`, data);
    },
    setDated(data) {
      this.$store.commit(`documents/${this.documentId}/DATED`, data);
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE`, data);
    },
    setAssignee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE`, data);
    },
    setDepartment(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT`, data);
    },
    setBusinessUnit(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_BUSINESS_UNIT`,
        data
      );
    },
    dispatchCorrespondent(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setCorrespondent`,
        data
      );
    },
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
  },
};
</script>
