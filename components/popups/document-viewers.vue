<template>
  <div>
    <!-- <pdfFileReader
      @close="close"
      @valueChanged="valueChanged"
      @loadStatus="loadStatus"
      :options="options"
    ></pdfFileReader> -->
    <component
      @close="close"
      @valueChanged="valueChanged"
      @loadStatus="loadStatus"
      :options="options"
      :is="viewersByType"
    ></component>
  </div>
</template>

<script>
import documentEditor from "./document-editor-popup";
import pdfFileReader from "./pdf-file-reader-popup.vue";
export default {
  components: {
    documentEditor,
    pdfFileReader
  },
  props: {
    options: {}
  },
  computed: {
    viewersByType() {
      const extension = this.options.extension;
      console.log(extension);
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
