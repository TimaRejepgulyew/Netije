<template>
  <div>
    <!-- <div>
      <ejs-toolbar id="customToolbar" ref="toolbar">
        <e-items>
          <e-item
            prefixIcon="e-pv-open-document-icon"
            tooltipText="Open"
            :click="openClicked"
          ></e-item>
          <e-item
            prefixIcon="e-pv-previous-page-navigation-icon"
            id="previousPage"
            tooltipText="Previous Page"
            align="Center"
            :click="previousClicked"
          ></e-item>
          <e-item
            prefixIcon="e-pv-next-page-navigation-icon"
            id="nextPage"
            tooltipText="Next Page"
            align="Center"
            :click="nextClicked"
          ></e-item>
          <e-item
            :template="pageNoTemplate"
            tooltipText="Page Number"
            align="Center"
          ></e-item>
          <e-item
            :template="pageTextTemplate"
            tooltipText="Page Number"
            align="Center"
          ></e-item>
          <e-item
            prefixIcon="e-pv-print-document-icon"
            tooltipText="Print"
            align="Right"
            :click="printClicked"
          ></e-item>
          <e-item
            prefixIcon="e-pv-download-document-icon"
            tooltipText="Download"
            align="Right"
            :click="downloadClicked"
          ></e-item>
        </e-items>
      </ejs-toolbar>

      <ejs-toolbar id="magnificationToolbar">
        <e-items>
          <e-item
            prefixIcon="e-pv-fit-page-icon"
            id="fitPage"
            tooltipText="Fit to page"
            :click="pageFitClicked"
          ></e-item>
          <e-item
            prefixIcon="e-pv-zoom-in-icon"
            id="zoomIn"
            tooltipText="Zoom in"
            :click="zoomInClicked"
          ></e-item>
          <e-item
            prefixIcon="e-pv-zoom-out-icon"
            id="zoomOut"
            tooltipText="Zoom out"
            :click="zoomOutClicked"
          ></e-item>
        </e-items>
      </ejs-toolbar>

      <input
        type="file"
        id="fileUpload"
        accept=".pdf"
        style="display: block; visibility: hidden; width: 0; height: 0"
      />

      <div class="control-section">
        <ejs-pdfviewer
          id="pdfviewer"
          ref="pdfviewer"
          :pageChange="pageChange"
          :documentLoad="documentLoad"
          :serviceUrl="serviceUrl"
          :documentPath="documentPath"
          :enableToolbar="enableToolbar"
        ></ejs-pdfviewer>
      </div>
    </div> -->
    <!-- height="80vh" -->
    <!-- :enableToolbar="enableToolbar" -->
    <ejs-pdfviewer
      id="pdfViewer"
      height="85vh"
      :serviceUrl="serviceUrl"
      :documentPath="documentPath"
      :toolbarSettings="toolbarSettings"
      :ajaxRequestSettings="ajaxSettings"
      v-if="show"
    >
      <!-- :enablePrint="false"
      :isCommandPanelOpen="true"
      :enableMagnification="false" -->
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
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { CalendarPlugin } from "@syncfusion/ej2-vue-calendars";
Vue.use(CalendarPlugin);
Vue.use(PdfViewerPlugin);
Vue.use(ToolbarPlugin);

export default {
  data() {
    return {
      show: false,
      serviceUrl: "https://192.168.4.159/api/pdfViewer",
      documentPath: "file.pdf",
      enableToolbar: false,
      locale: "ru-RU",
      toolbarSettings: {
        toolbarItems: ["MagnificationTool", "PageNavigationTool"],
      },
      // pageNoTemplate:
      //   '<div class=""><input type="text" class="e-input-group e-pv-current-page-number" id="currentPage" /></div>',
      // pageTextTemplate:
      //   '<div class=""><span class="e-pv-total-page-number" id="totalPage">of 0</span></div>',
      ajaxSettings: {
        ajaxHeaders: [
          {
            headerName: "authorization",
            headerValue:
              "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU4NTVERjFCMjc0NDY4NEIzNkMwQ0MwODMzMDBBMUYzQ0UwRjM1MDAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiI2RlhmR3lkRWFFczJ3TXdJTXdDaDg4NFBOUUEifQ.eyJuYmYiOjE2MDYzNjcwMDYsImV4cCI6MTYwNjM5NTgwNiwiaXNzIjoiaHR0cHM6Ly8xOTIuMTY4LjQuMTU5IiwiYXVkIjoiVFREb2MuVUlBUEkiLCJjbGllbnRfaWQiOiJUVERvYy5VSSIsInN1YiI6IjJkOGM1NmRiLWM1MWItNDE4Yy04OWQwLTUxMzc5MzM1YjU0MyIsImF1dGhfdGltZSI6MTYwNjM2NzAwMSwiaWRwIjoibG9jYWwiLCLQmNCUINGB0L7RgtGA0YPQtNC90LjQutCwIjoiMTgiLCJMYXN0UGFzc3dvcmRDaGFuZ2VEYXRlIjoiIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIlRURG9jLlVJQVBJIl0sImFtciI6WyJwd2QiXX0.p8dTCYE3zJV_xm9oD7nZn_Ekm5sC2_97lJC8-dYOmjPZhakzfwDguOyPM5QwWCvOCD91xihFShaHDWrk_ScFN55pO90CeodgXfyyENpWMWBgaLvAZhfNDz6IXk6BbqVArv_1iJy1mnvlfsyvyC9ezJp_rrlYqQhLa-8sftRFZoNYqJsZ-8EI4dK3TGuBC4N1a1lmTHEZKNQKuiHOStWg3DNs6siypKyXq7xdmPnEgtL98XTX0RA2qRpg8efqpnAaR5j4cBBs0xcuIV_aaUf21AxFFyBsVW_UddwsFK0v-tFGbaX2CLu5v-IaQBdyJJwhwvfVQy6eCzIJgjnrtuO4eQ",
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
    }, 500);
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
