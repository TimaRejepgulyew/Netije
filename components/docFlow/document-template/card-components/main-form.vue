<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="documentValidatorName"
    >
      <DxSimpleItem data-field="name" :editor-options="nameOptions">
        <DxLabel location="left" :text="$t('document.fields.name')" />
        <DxRequiredRule :message="$t('document.validation.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentKindId"
        :editor-options="documentKindOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.documentKindId')" />
        <DxRequiredRule
          :message="$t('document.validation.documentKindIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentTypeId"
        :editor-options="documentTypeOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.documentType')" />
        <DxRequiredRule
          :message="$t('document.validation.documentTypeRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="departmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="note"
        :editor-options="noteOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="left" :text="$t('document.fields.note')" />
      </DxSimpleItem>
    </DxForm>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
  },
  props: ["documentId", "isCard"],
  inject: ["documentValidatorName"],
  computed: {
    canUpdate() {
      console.log(
        "documentid ",
        this.documentId,
        this.$store.getters[`documents/${this.documentId}/canUpdate`]
      );
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    nameOptions() {
      return {
        readOnly: !this.canUpdate,
        value: this.document?.name,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/SET_NAME`, e.value);
        },
      };
    },
    documentTypeOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentType,
        }),
        valueExpr: "documentTypeGuid",
        value: this.document?.documentTypeGuid,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DOCUMENT_TYPE_GUID`,
            e.value
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_DOCUMENT_KIND_ID`,
            null
          );
        },
      };
    },
    documentKindOptions() {
      console.log(this.document.documentTypeGuid, "typeGuid");
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeGuid", "=", this.document.documentTypeGuid],
            "and",
            ["status", "=", 0],
          ],
        }),

        value: this.document?.documentKindId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DOCUMENT_KIND_ID`,
            e.value
          );
        },
      };
    },
    businessUnitOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
        }),
        value: this.document?.businessUnitId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,
            e.value
          );
        },
      };
    },
    departmentOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
        }),
        value: this.document?.departmentId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            e.value
          );
        },
      };
    },
    noteOptions() {
      return {
        height: 90,
        value: this.document?.body,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/ SET_NOTE`, e.value);
        },
      };
    },
  },
};
</script>

<style>
</style>