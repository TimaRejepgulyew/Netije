<template>
  <div>
    <ejs-documenteditorcontainer
      :headers="headers"
      :locale="$i18n.locale"
      :toolbarClick="onToolbarClick"
      :toolbarItems="toolbarItems"
      v-if="mounted"
      @created="onCreated"
      ref="documentEditordocx"
      :serviceUrl="serviceUrl"
      height="85vh"
      style="height:800px;"
      id="documentEditordocx"
      :documentName.sync="documentName"
      :enableToolbar="true"
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
import DocumentEditorTranslateRu, {
  documentEditorContainer as documentEditorContainerTranslateRu
} from "~/lang/i18n-translation/ru/documentEditor.js";
import DocumentEditorTranslateTk, {
  documentEditorContainer as documentEditorContainerTranslateTk
} from "@/lang/i18n-translation/tk/documentEditor";
import { L10n, setCulture } from "@syncfusion/ej2-base";
L10n.load({
  ru: {
    DocumentEditor: {
      ...DocumentEditorTranslateRu
    },
    documenteditorcontainer: documentEditorContainerTranslateRu
  },
  tk: {
    DocumentEditor: {
      ...DocumentEditorTranslateTk
    },
    documenteditorcontainer: documentEditorContainerTranslateTk
  }
});
Vue.use(DocumentEditorContainerPlugin);
export default {
  props: {
    file: null,
    options: {
      type: Object
    }
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
      serviceUrl: "https://192.168.4.159/api/documentEditor/"
    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  created() {
    console.log(this.$refs["container"]);
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
    }, 500);
  },
  computed: {},
  methods: {
    onCreated(e) {
      const { documentEditor } = this.$refs["documentEditordocx"].ej2Instances;
      documentEditor.resize();
      this.file = documentEditor;
    },
    onToolbarClick: function(args) {
      switch (args.item.id) {
        case "save":
          this.valueChanged();
          // this.close();
          break;
      }
    },

    close() {
      this.$emit("onClose");
    },
    async valueChanged() {
      // let sfdt = `{
      //       "sections": [
      //           {
      //               "blocks": [
      //                   {
      //                       "inlines": [
      //                           {
      //                               "characterFormat": {
      //                                   "bold": true,
      //                                   "italic": true
      //                               },
      //                               "text": "Hello World"
      //                           }
      //                       ]
      //                   }
      //               ],
      //               "headersFooters": {
      //               }
      //           }
      //       ]
      //   }`;
      const { data } = await this.$axios.post(
        "/api/documentEditor/loadDefault",
        {},
        {
          headers: { id: 118, lastVersion: true }
        }
      );
      console.log(data);
      this.file.open(data);

      // const blob = await this.file.saveAsBlob("Docx");
      // console.log(this.$refs["documentEditordocx"].ej2Instances);
      // this.$emit("valueChanged", { file: blob });
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
