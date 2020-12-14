<template>
  <document-template-grid
    :isCard="true"
    :documentId="options.documentId"
    @selectedDocument="valueChanged"
  />
</template>

<script>
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import dataApi from "~/static/dataApi";
export default {
  components: {
    documentTemplateGrid: () =>
      import(
        "~/components/docFlow/document-template/document-template-by-id.vue"
      )
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
      this.$emit("close");
    }
  },
  mounted() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("document.headers.documentTemplate"));
  }
};
</script>

<style></style>
