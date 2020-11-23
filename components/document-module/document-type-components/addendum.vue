<template>
  <DxForm
    :col-count="1"
    :store.sync="document"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem>
      <DxSimpleItem data-field="leadingDocumentId" template="leadingDocument">
        <DxLabel
          location="left"
          :text="$t('document.fields.leadingDocumentId')"
        />
        <DxRequiredRule
          :message="$t('document.validation.leadingDocumentIdRequired')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <template #leadingDocument>
      <customSelectBoxDocument
        :validationGroup="documentValidatorName"
        :value="document.leadingDocument"
        :isRequired="true"
        @valueChanged="setLeadingDocument"
      />
    </template>
  </DxForm>
</template>
<script>
import customSelectBoxDocument from "~/components/document/select-box/index.vue";
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
    DxRequiredRule,
    customSelectBoxDocument
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  methods: {
    setLeadingDocument(value) {
      console.log(value, "addendum");
      this.$store.dispatch(
        `documents/${this.documentId}/setLeadingDocumentId`,
        value
      );
    }
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    }
  }
};
</script>
