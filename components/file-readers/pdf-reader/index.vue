<template>
  <div>
    <ejs-pdfviewer
      id="pdfViewer"
      height="86vh"
      :serviceUrl="serviceUrl"
      :locale="$i18n.locale"
      :documentPath="documentPath"
      :toolbarSettings="toolbarSettings"
      :ajaxRequestSettings="ajaxSettings"
      v-if="show"
    >
    </ejs-pdfviewer>
  </div>
</template>

<script>
// this.$popup.pdfFileReader(this, {}, { showLoadingPanel: false });
import Vue from "vue";
import {
  PdfViewerPlugin,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
} from "@syncfusion/ej2-vue-pdfviewer";
Vue.use(PdfViewerPlugin);
import dataApi from "~/static/dataApi";
import PdfViewerTranslateRu from "@/lang/i18n-translation/ru/pdfViewer";
import PdfViewerTranslateTk from "@/lang/i18n-translation/tk/pdfViewer";
import { L10n, setCulture } from "@syncfusion/ej2-base";
L10n.load({
  ru: {
    PdfViewer: {
      ...PdfViewerTranslateRu,
    },
  },
  tk: {
    PdfViewer: {
      ...PdfViewerTranslateTk,
    },
  },
});
export default {
  data() {
    return {
      show: false,
      serviceUrl: dataApi.fileEditors.PdfViewer,
      documentPath: "file.pdf",
      locale: "ru-RU",
      toolbarSettings: {
        toolbarItems: [
          "MagnificationTool",
          "PageNavigationTool",
          "PanTool",
          "SelectionTool",
          "SearchOption",
          "DownloadOption",
        ],
      },
      ajaxSettings: {
        ajaxHeaders: [
          {
            headerName: "authorization",
            headerValue:
              "Bearer " + this.$store.getters["oidc/oidcAccessToken"],
          },
        ],
      },
    };
  },
  provide: {
    PdfViewer: [
      Toolbar,
      Magnification,
      Navigation,
      LinkAnnotation,
      BookmarkView,
      ThumbnailView,
      Print,
      TextSelection,
      TextSearch,
    ],
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 300);
  },
};
</script>

<style>
@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css";
</style>
