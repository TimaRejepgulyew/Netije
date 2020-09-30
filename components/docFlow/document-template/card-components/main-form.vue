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
    documentTypeOptions() {
      return {
        readOnly: this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentType,
          filter: ["status", "=", 0],
        }),
        value: this.document.documentType,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDocumentKind`,
            e.value
          );
        },
      };
    },
  },
};
</script>

<style>
</style>