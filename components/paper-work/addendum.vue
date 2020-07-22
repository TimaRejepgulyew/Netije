<template>
  <DxForm
    :col-count="1"
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem>
      <DxSimpleItem
        data-field="leadingDocumentId"
        :editor-options="leadingDocumentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.leadingDocumentId')" />
        <DxRequiredRule :message="$t('translations.fields.leadingDocumentIdRequired')" />
      </DxSimpleItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
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
  computed: {
    store() {
      return this.$store.getters["currentDocument/document"];
    },
    leadingDocumentOptions() {
      return {
        readOnly: this.$store.getters["currentDocument/readOnly"],
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.paperWork.AllDocument
        }),
        value: this.$store.getters["currentDocument/document"]
          .leadingDocumentId,
        onValueChanged: e => {
          this.$store.dispatch("currentDocument/setLeadingDocumentId", e.value);
        }
      };
    }
  }
};
</script>
