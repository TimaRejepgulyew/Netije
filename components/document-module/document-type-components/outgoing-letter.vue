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
        <DxRequiredRule :message="$t('document.validation.counterPartRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="addresseeId" template="contact">
        <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="inResponseToId"
        :editor-options="inResponseToIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.inResponseToId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-count="2" :caption="$t('shared.fromWhom')">
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
      <DxSimpleItem template="prepared" data-field="preparedById">
        <DxRequiredRule :message="$t('document.validation.preparedRequired')" />
        <DxLabel location="left" :text="$t('document.fields.preparedById')" />
      </DxSimpleItem>
    </DxGroupItem>

    <template #correspondent>
      <custom-select-box
        :disabled="readOnly"
        :validatorGroup="documentValidatorName"
        @valueChanged="setCorrenspondent"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        messageRequired="document.validation.counterPartRequired"
        :value="correspondentId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :disabled="!isCompany||readOnly"
        :correspondentId="correspondentId"
        @valueChanged="setAddressee"
        :value="addresseeId"
      />
    </template>

    <template #prepared>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :validatorGroup="documentValidatorName"
        :value="preparedById"
        @valueChanged="setPreparedById"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="readOnly || !canUpdate"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged=" (data) => {
                          setBusinessUnitId(data)
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
    customSelectBox,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
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
    businessUnitId() {
      return this.document.businessUnitId;
    },
    preparedById() {
      return this.document.preparedById;
    },
    ourSignatoryId() {
      return this.document.ourSignatoryId;
    },
    addresseeId() {
      return this.document.addresseeId;
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
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
    store() {
      return this.document;
    },
    correspondentId() {
      return this.document.correspondentId;
    },
    deparmentOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.setDepartmentId(e.value)
        },
      };
    },
    inResponseToIdOptions() {
      return {
        readOnly: !this.correspondentId,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.documentModule.Documents}${DocumentQuery.IncomingLetter}`,
          filter: ["correspondentId", "=", this.document.correspondentId],
        }),
        value: this.document.inResponseToId,
        onValueChanged: (e) => {
          this.setInResponseToId(e.value)
        },
      };
    },
  },
  methods: {
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
    setCorrenspondent(data) {
      if (data == null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.dispatchCorrespondent(data)
      this.setInResponseToId(null)
      this.setAddressee(null)
    },
    dispatchCorrespondent(data) {
      this.$store.dispatch(`documents/${this.documentId}/setCorrespondent`, data);
    },
    setInResponseToId(data) {
      this.$store.commit(`documents/${this.documentId}/IN_RESPONSE_TO_ID`, data)
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data && data.id);
    },
    setPreparedById(data) {
      this.$store.commit(`documents/${this.documentId}/SET_PREPARED_BY_ID`, data);
    },
    setOurSignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_OUR_SIGNATORY_ID`, data);
    },
    setDepartmentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
  },
};
</script>
