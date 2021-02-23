<template>
  <DxForm
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :readOnly="!canUpdate"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :caption="$t('document.fields.whom')">
      <DxSimpleItem data-field="correspondentId" template="correspondent">
        <DxLabel location="left" :text="$t('document.fields.counterPart')" />
        <DxRequiredRule
          :message="$t('document.validation.counterPartRequired')"
        />
      </DxSimpleItem>

      <DxSimpleItem data-field="addressee" template="contact">
        <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem
        template="inResponseTo"
        :col-span="2"
        data-field="inResponseTo"
      >
        <DxLabel location="left" :text="$t('document.fields.inResponseToId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-count="2" :caption="$t('shared.fromWhom')">
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

      <DxSimpleItem data-field="ourSignatory" template="ourSignatory">
        <DxLabel location="left" :text="$t('document.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem template="prepared" data-field="preparedBy">
        <DxRequiredRule :message="$t('document.validation.preparedRequired')" />
        <DxLabel location="left" :text="$t('document.fields.preparedById')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #inResponseTo>
      <customSelectBoxDocument
        :readOnly="inResponseToOptions.readOnly"
        :dataSourceFilter="inResponseToOptions.dataSourceFilter"
        :dataSourceQuery="inResponseToOptions.dataSourceQuery"
        :value="document.inResponseTo"
        @valueChanged="setInResponseTo"
      />
    </template>
    <template #correspondent>
      <custom-select-box
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
        @valueChanged="setAddressee"
        :value="addressee"
      />
    </template>

    <template #prepared>
      <employee-select-box
        :read-only="!canUpdate"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="preparedBy"
        @valueChanged="setPreparedBy"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :read-only="!canUpdate"
        :value="ourSignatory"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatory"
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
    customSelectBox,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
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
      signatoryApi: dataApi.signatureSettings.Members,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    businessUnitId() {
      return this.document.businessUnit?.id;
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    department() {
      return this.document.department;
    },
    preparedBy() {
      return this.document.preparedBy;
    },
    ourSignatory() {
      return this.document.ourSignatory;
    },
    addressee() {
      return this.document.addressee;
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
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    store() {
      return this.document;
    },
    correspondentId() {
      return this.document.correspondentId;
    },
    inResponseToOptions() {
      return {
        readOnly: !this.correspondentId || this.readOnly,
        dataSourceQuery: DocumentQuery.IncomingLetter,
        dataSourceFilter: this.correspondentId
          ? ["correspondentId", "=", this.correspondentId]
          : undefined,
      };
    },
  },
  methods: {
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
      this.$store.commit(
        `documents/${this.documentId}/SET_CORRESPONDENT`,
        data
      );
    },
    setCorrenspondent(data) {
      if (data === null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.dispatchCorrespondent(data);
      this.setInResponseTo(null);
      this.setAddressee(null);
    },
    dispatchCorrespondent(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setCorrespondent`,
        data
      );
    },
    setInResponseTo(data) {
      this.$store.commit(`documents/${this.documentId}/IN_RESPONSE_TO`, data);
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE`, data);
    },
    setPreparedBy(data) {
      this.$store.commit(`documents/${this.documentId}/SET_PREPARED_BY`, data);
    },
    setOurSignatory(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY`,
        data
      );
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
  },
};
</script>
