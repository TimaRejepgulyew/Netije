<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :read-only="!canUpdate"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="documentValidatorName"
    >
      <DxSimpleItem data-field="name" :editor-options="nameOptions">
        <DxLabel location="left" :text="$t('document.fields.name')" />
        <DxRequiredRule :message="$t('document.validation.nameRequired')" />
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
  computed: {
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    nameOptions() {
      return {
        readOnly: this.canUpdate,
        value: this.document.name,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDocumentName`,
            e.value
          );
        },
      };
    },
    documentType() {
      return {
        readOnly: this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentType,
        }),
        value: this.document.documentType,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDocumentType`,
            e.value
          );
        },
      };
    },
    documentKindOptions() {
      return {
        readOnly: this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeGuid", "=", this.document.documentTypeGuid],
            "and",
            ["status", "=", 0],
          ],
        }),
        value: this.document.documentKindId,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDocumentKind`,
            e.value
          );
        },
      };
    },
    businessUnitOptions() {
      return {
        readOnly: this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
        }),
        value: this.document.businessUnitId,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setBusinessUnitId`,
            e.value
          );
        },
      };
    },
    departmentOptions() {
      return {
        readOnly: this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDepartmentId`,
            e.value
          );
        },
      };
    },
    noteOptions() {
      return {
        height: 90,
        value: this.document.body,
        onValueChanged: (e) => {
          this.$store.dispatch(`documents/${this.documentId}/setBody`, e.value);
        },
      };
    },
  },
};
</script>

<style>
</style>