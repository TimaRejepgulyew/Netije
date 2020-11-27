<template>
  <div>
    <!-- <docx-toolbar
    readOnly
      @save="valueChanged"
    /> -->
    <ejs-documenteditorcontainer
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
import docxToolbar from "./components/toolbar.vue";
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
  components: {
    docxToolbar
  },
  props: {
    file: null,
    options: {
      type: Object
    }
  },
  data() {
    return {
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
      serviceUrl:
        "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
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
  methods: {
    onCreated(e) {
      console.log(this.$refs);
      const { documentEditor } = this.$refs["documentEditordocx"].ej2Instances;
      //   documenteditor = container.documentEditor;
      console.log(documentEditor);
      documentEditor.resize();
      this.file = documentEditor;
      console.log("created", documentEditor);
    },
    onToolbarClick: function(args) {
      switch (args.item.id) {
        case "save":
          this.valueChanged();
          this.close();
          break;
      }
    },
    close() {
      this.$emit("onClose");
    },
    async valueChanged() {
      const blob = await this.file.saveAsBlob("Docx");
      console.log(this.$refs["documentEditordocx"].ej2Instances);
      console.log(blob);
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
