<template>
  <docx-editor @valueChanged="valueChanged" @onClose="close" />
</template>

<script>
import docxEditor from "~/components/editors/docx/index.vue";
import dataApi from "~/static/dataApi";
import Vue from "vue";
import {
  DocumentEditorContainerPlugin,
  DocumentEditorContainerComponent,
  Toolbar
} from "@syncfusion/ej2-vue-documenteditor";

Vue.use(DocumentEditorContainerPlugin);
export default {
  components: { docxEditor },
  name: "document-editor-popup",
  props: {
    options: {
      type: Object
    }
  },
  created() {
    this.$emit("loadStatus");
    this.$emit("showTitle", "Document editor");
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
