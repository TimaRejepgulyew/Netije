<template>
  <DxForm
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :readOnly="!canUpdate"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :caption="$t('translations.fields.whom')">
      <DxSimpleItem data-field="correspondentId" template="correspondent">
        <DxLabel location="left" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="addresseeId" template="contact">
        <DxLabel location="left" :text="$t('translations.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="inResponseToId"
        :editor-options="inResponseToIdOptions"
        editor-type="dxSelectBox"
        :help-text="correspondentId?'':$t('translations.fields.counterPartRequired')"
      >
        <DxLabel location="left" :text="$t('translations.fields.inResponseToId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-count="2" :caption="$t('translations.fields.fromWhom')">
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.businessUnitId')" />
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="deparmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.departmentId')" />
        <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
        <DxLabel location="left" :text="$t('translations.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem template="prepared" data-field="preparedById">
        <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
        <DxLabel location="left" :text="$t('translations.fields.prepared')" />
      </DxSimpleItem>
    </DxGroupItem>

    <template #correspondent>
      <custom-select-box
        :disabled="readOnly"
        validatorGroup="OfficialDocument"
        @valueChanged="setCorrenspondent"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        messageRequired="translations.fields.counterPartRequired"
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
        validatorGroup="OfficialDocument"
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
  </DxForm>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/documentQuery.js";
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
  },
  props: ["documentId"],
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
    };
  },
  methods: {
    setCorrenspondent(data) {
      if (data == null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.$store.commit(`documents/${this.documentId}/IN_RESPONSE_TO_ID`, null);
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, null);
      this.$store.dispatch(
        `documents/${this.documentId}/setCorrespondent`,
        data
      );
    },
    setAddressee(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_ADDRESSE_ID`,
        data && data.id
      );
    },
    setPreparedById(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_PREPARED_BY_ID`,
        data
      );
    },
    setOurSignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
        data
      );
    },
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
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
    businessUnitId() {
      return this.document.businessUnitId;
    },

    businessUnitOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0],
        }),
        value: this.document.businessUnitId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,
            e.value
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            null
          );
        },
      };
    },
    deparmentOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", this.businessUnitId],
            "and",
            ["status", "=", 0],
          ],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            e.value
          );
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
          this.$store.commit(
            `documents/${this.documentId}/IN_RESPONSE_TO_ID`,
            e.value
          );
        },
      };
    },
  },
};
</script>
