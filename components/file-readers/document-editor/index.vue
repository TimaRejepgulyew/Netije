<template>
  <div>
    <ejs-documenteditorcontainer
      :restrictEditing="readOnly"
      :headers="headers"
      :toolbarClick="onToolbarClick"
      :toolbarItems="toolbarItems"
      @created="onCreated"
      ref="documentEditordocx"
      :serviceUrl="serviceUrl"
      height="85vh"
      v-if="mounted"
      :documentName="documentName"
      :enableToolbar="!readOnly"
    ></ejs-documenteditorcontainer>
  </div>
</template>

<script>
import saveIcon from "~/static/icons/save.svg";

import dataApi from "~/static/dataApi";
import Vue from "vue";
import {
  DocumentEditorContainerPlugin,
  DocumentEditorContainerComponent,
  Toolbar
} from "@syncfusion/ej2-vue-documenteditor";

Vue.use(DocumentEditorContainerPlugin);
export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    file: {},
    isNew: { type: Boolean }
  },
  data() {
    return {
      headers: [
        {
          authorization: "Bearer " + this.$store.getters["oidc/oidcAccessToken"]
        }
      ],
      toolbarItems: [
        {
          prefixIcon: "e-de-save-icon",
          tooltipText: this.$t("buttons.save"),
          text: this.$t("buttons.save"),
          id: "save"
        },
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "Bookmark",
        "Comments",
        "TableOfContents",
        "Separator",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        "Separator",
        "Find",
        "Separator",
        "LocalClipboard",
        "RestrictEditing"
      ],
      mounted: false,
      documentName: "",
      serviceUrl: dataApi.documentEditor.ServerUrl
    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
    }, 500);
  },
  methods: {
    async openDocument(documentEditor) {
      if (this.file) documentEditor.open(this.file);
    },
    onCreated(e) {
      const { documentEditor } = this.$refs["documentEditordocx"].ej2Instances;
      documentEditor.resize();
      if (!this.isNew) this.openDocument(documentEditor);
    },
    onToolbarClick: function(args) {
      switch (args.item.id) {
        case "save":
          this.saveDocument();
          this.close();
          break;
      }
    },

    close() {
      this.$emit("onClose");
    },
    async saveDocument() {
      const { documentEditor } = this.$refs["documentEditordocx"].ej2Instances;
      const blob = await documentEditor.saveAsBlob("Docx");
      this.$emit("valueChanged", { file: blob });
    }
  }
};
</script>

<style lang="scss">
.e-de-save-icon::before {
  content: "\e735";
  font-family: "e-icons";
}
@import "~/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "~/node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
