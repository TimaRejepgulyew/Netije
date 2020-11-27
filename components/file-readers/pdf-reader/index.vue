<template>
  <div>
    <ejs-pdfviewer
      id="pdfViewer"
      height="85vh"
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
export default {
  props: {
    id: {
      type: Number,
    },
    lastVersion: {
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
      serviceUrl: dataApi.documentEditor.PdfViewer,
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
    };
  },
  computed: {
    ajaxSettings() {
      return {
        ajaxHeaders: [
          {
            headerName: "authorization",
            headerValue:
              "Bearer " + this.$store.getters["oidc/oidcAccessToken"],
          },
          {
            headerName: "id",
            headerValue: this.id,
          },
          {
            headerName: "lastVersion",
            headerValue: this.lastVersion,
          },
        ],
      };
    },
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
