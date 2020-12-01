<template>
  <div>
    <ejs-spreadsheet
      :created="openFile"
      ref="spreadSheet"
      height="85vh"
      v-if="mounted"
      :openUrl="openUrl"
      :saveUrl="saveUrl"
      :allowSave="true"
      :allowOpen="true"
    ></ejs-spreadsheet>
  </div>
</template>

<script>
import Vue from "vue";
import { SpreadsheetPlugin } from "@syncfusion/ej2-vue-spreadsheet";
import dataApi from "~/static/dataApi";
Vue.use(SpreadsheetPlugin);
export default {
  props: {
    readOnly: { type: Boolean },
    params: {}
  },
  data() {
    return {
      mounted: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
    }, 500);
  },
  computed: {
    openUrl() {
      const url = this.params.versionId
        ? `${dataApi.documentEditor.importVersion}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&versionId=${this.params.versionId}`
        : `${dataApi.documentEditor.importDocument}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&documentId=${this.params.documentId}`;
      return url;
    },
    saveUrl() {
       const url = this.params.versionId
        ? `${dataApi.documentEditor.importVersion}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&versionId=${this.params.versionId}`
        : `${dataApi.documentEditor.importDocument}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&documentId=${this.params.documentId}`;
      return url;
    }
  },
  methods: {
    openFile(e) {
      const element = this.$refs["spreadSheet"].ej2Instances;
      console.log(element);
      element.openFromJson({
        file: JSON.stringify({
          Workbook: {
            definedNames: [],
            sheets: [
              {
                columns: [{}, {}, {}, {}],
                name: "Лист1",
                rows: [
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, { value: "dawdawdaw" }] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, {}] },
                  { cells: [{}, {}, {}, { value: "dawdawd" }] },
                  { cells: [{}, {}, {}, { value: "dawdawd" }] },
                  { cells: [{}, {}, {}, {}] }
                ],
                selectedRange: "D3",
                usedRange: { colIndex: 4, rowIndex: 10 }
              }
            ]
          }
        })
      });
    },
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      console.log(params);
      this.$emit("valueChanged");
    }
  }
};
</script>

<style>
@import "~/node_modules/@syncfusion/ej2-vue-spreadsheet/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-spreadsheet/styles/material.css";
</style>
