<template>
  <component
    @close="close"
    @valueChanged="valueChanged"
    @loadStatus="loadStatus"
    :options="options"
    :is="viewersByType"
  ></component>
</template>

<script>
import documentEditor from "./document-editor-popup";
import pdfFileReader from "./pdf-file-reader-popup";
export default {
  components: {
    documentEditor,
    pdfEditor
  },
  props: {
    options: {}
  },
  computed: {
    viewersByType() {
      const extension = this.options.extencion;
      console.log();
      switch (extension) {
        case ".docx":
          return "documentEditor";
        case ".pdf":
          return "pdfFileReader";
      }
    }
  },
  methods: {
    loadStatus() {
      this.$emit("loadStatus");
    },
    showTitle(title) {
      this.$emit("showTitle", title);
    },
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
    }
  }
};
</script>

<style></style>
