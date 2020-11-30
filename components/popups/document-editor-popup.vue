<template>
  <docx-editor
    v-if="file"
    :file="file"
    :readOnly="options.readOnly"
    @valueChanged="valueChanged"
    @onClose="close"
  />
</template>

<script>
import docxEditor from "~/components/file-readers/document-editor/index.vue";
import dataApi from "~/static/dataApi";




export default {
  components: { docxEditor },
  name: "document-editor-popup",
  props: {
    options: {
      type: Object
    }
  },

  async created() {
    if (this.options.handler && this.options.params)
      this.file = await this.options.handler(this, this.options.params);
    console.log(this.file, "file");
    this.$emit("showTitle", this.$t("document.headers.documentEditor"));
    this.$emit("loadStatus");
  },
  data() {
    return {
      file: null
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
    }
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
