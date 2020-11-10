<template>
  <DxForm
    :col-count="1"
    :store.sync="document"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem>
      <DxSimpleItem
        data-field="leadingDocumentId"
        :editor-options="leadingDocumentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.leadingDocumentId')"
        />
        <DxRequiredRule
          :message="$t('document.validation.leadingDocumentIdRequired')"
        />
      </DxSimpleItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },

    leadingDocumentOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.documentModule.AllDocument)
        .acceptCustomValues(e => {
          e.customItem = null;
        })
        .withoutDeferRendering()
        .focusStateDisabled()
        .clearValueExpr()
        .build(this);
      return {
        readOnly: this.readOnly,
        ...options,
        value: this.document.leadingDocument,
        onValueChanged: e => {
          this.$store.dispatch(
            `documents/${this.documentId}/setLeadingDocumentId`,
            e.value.id
          );
        }
      };
    }
  }
};
</script>
