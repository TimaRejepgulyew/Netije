<template>
  <ejs-documenteditorcontainer
    ref="documenteditor"
    :serviceUrl="serviceUrl"
    style="height:800px;"
    id="container"
    :enableToolbar="true"
  ></ejs-documenteditorcontainer>
</template>

<script>
import dataApi from "~/static/dataApi";
import Vue from "vue";
import {
  DocumentEditorContainerPlugin,
  DocumentEditorContainerComponent,
  Toolbar
} from "@syncfusion/ej2-vue-documenteditor";

Vue.use(DocumentEditorContainerPlugin);
export default {
  components: {},
  name: "document-editor",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      serviceUrl:
        "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
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
