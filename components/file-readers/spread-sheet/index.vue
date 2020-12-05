<template>
  <div>
    <ejs-spreadsheet
      :showRibbon="!readOnly"
      :allowEditing="!readOnly"
      :created="openFile"
      ref="spreadSheet"
      height="85vh"
      v-if="mounted"
      :openUrl="openUrl"
      :saveUrl="saveUrl"
      :allowSave="allowSave"
      @beforeCellSave="checkAllowSave"
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
    params: {},
    file: {},
    isNew: { type: Boolean },
  },
  data() {
    return {
      allowSave: false,
      mounted: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
    }, 500);
  },
  computed: {
    openUrl() {
      const url = this.params?.versionId
        ? `${dataApi.spreadSheet.ImportVersionWithUrl}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&versionId=${this.params.versionId}`
        : `${dataApi.spreadSheet.ImportDocumentWithUrl}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&documentId=${this.params.documentId}`;
      return url;
    },
    saveUrl() {
      const url = this.params?.versionId
        ? `${dataApi.spreadSheet.ExportVersionWithUrl}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&versionId=${this.params.versionId}`
        : `${dataApi.spreadSheet.ExportDocumentWithUrl}?access_token=${this.$store.getters["oidc/oidcAccessToken"]}&documentId=${this.params.documentId}`;
      return url;
    },
  },
  methods: {
    async saveJsonFile() {
      if (this.allowSave) {
        const element = this.$refs["spreadSheet"].ej2Instances;
        const { jsonObject } = await element.saveAsJson();
        this.valueChanged(jsonObject);
      }
    },
    checkAllowSave(e) {
      if (e.value !== e.oldValue) {
        return (this.allowSave = true);
      }
    },
    openFile(e) {
      const element = this.$refs["spreadSheet"].ej2Instances;
      element.hideFileMenuItems(["File"], true);
      element.addToolbarItems(
        "Home",
        [
          {
            click: this.saveJsonFile,
            prefixIcon: "e-de-save-icon",
            tooltipText: this.$t("buttons.save"),
            text: this.$t("buttons.save"),
            id: "save",
          },
        ],
        2
      );
      if (!this.isNew) {
        element.openFromJson({
          file: this.file,
        });
      }
    },
    close() {
      this.$emit("onClose");
    },

    valueChanged(file) {
      this.$emit("valueChanged", { file });
    },
  },
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
