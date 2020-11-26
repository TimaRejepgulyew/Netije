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

    <!-- :enableToolbar="enableToolbar" -->
    <ejs-pdfviewer
      id="pdfViewer"
      height="85vh"
      :serviceUrl="serviceUrl"
      :documentPath="documentPath"
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

import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
Vue.use(PdfViewerPlugin);
Vue.use(ToolbarPlugin);
export default {
  data() {
    return {
      show: false,
      serviceUrl: "https://192.168.4.159/api/pdfViewer",
      documentPath: "file.pdf",
      enableToolbar: false,
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

#pdfviewer {
  height: 640px;
}

.control-section {
  padding-top: 0px !important;
}

#magnificationToolbar {
  background: transparent;
  height: auto;
  min-height: 56px;
  width: auto;
  border: none;
  position: absolute;
  z-index: 900;
  top: calc(100% - 110px);
  left: calc(100% - 120px);
  transform: rotate(90deg);
}

div#magnificationToolbar.e-toolbar .e-toolbar-items {
  background: transparent;
  padding: 2px 3px 2px 2px;
}

#magnificationToolbar.e-toolbar .e-tbar-btn {
  border-radius: 50%;
  min-height: 30px;
  min-width: 30px;
  border: 1px solid #c8c8c8;
}

#customToolbar {
  top: 0px;
  z-index: 900;
}

.e-bookmark-popup {
  height: 300px;
  max-width: 300px;
}

.e-text-search-popup {
  height: 104px;
  max-width: 348px;
}

.e-custom-search-input {
  width: 234px;
}

.e-text-search-popup .e-footer-content,
.e-bookmark-popup .e-footer-content {
  padding: 0;
  height: 0;
}

.search-button,
.search-button:disabled,
.search-button:focus,
.search-button:hover {
  background: transparent;
  box-shadow: none;
}

#popup .e-dlg-content {
  padding-left: 0;
  padding-bottom: 0;
}

.e-pv-bookmarks {
  min-width: 234px;
}

.e-pv-current-page-number {
  width: 46px;
  height: 28px;
  text-align: center;
}

.material .e-pv-current-page-number {
  border-width: 1px;
}

.e-icons {
  font-family: "e-icons";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 1;
  text-transform: none;
}

.e-pv-icon::before {
  font-family: "e-icons";
}

.e-pv-open-document-icon::before {
  content: "\e91c";
}

.e-pv-download-document-icon::before {
  content: "\e914";
}

.e-pv-print-document-icon::before {
  content: "\e917";
}

.e-pv-previous-page-navigation-icon::before {
  content: "\e910";
}

.e-pv-next-page-navigation-icon::before {
  content: "\e911";
}

.e-pv-zoom-out-icon::before {
  content: "\e912";
}

.e-pv-zoom-in-icon::before {
  content: "\e91d";
}

.e-pv-fit-page-icon::before {
  content: "\e91b";
}

.e-btn-icon.e-pv-zoom-out-icon.e-icons {
  transform: rotate(90deg);
}

@font-face {
  font-family: "e-icons";
  font-style: normal;
  font-weight: normal;
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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ZWd1bGFyY3VzdG9tLXRvb2xiYXJbMTkwOF1jdXN0b20tdG9vbGJhclsxOTA4XVZlcnNpb24gMS4wY3VzdG9tLXRvb2xiYXJbMTkwOF1Gb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAGMAdQBzAHQAbwBtAC0AdABvAG8AbABiAGEAcgBbADEAOQAwADgAXQBSAGUAZwB1AGwAYQByAGMAdQBzAHQAbwBtAC0AdABvAG8AbABiAGEAcgBbADEAOQAwADgAXQBjAHUAcwB0AG8AbQAtAHQAbwBvAGwAYgBhAHIAWwAxADkAMAA4AF0AVgBlAHIAcwBpAG8AbgAgADEALgAwAGMAdQBzAHQAbwBtAC0AdABvAG8AbABiAGEAcgBbADEAOQAwADgAXQBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIAB1AHMAaQBuAGcAIABTAHkAbgBjAGYAdQBzAGkAbwBuACAATQBlAHQAcgBvACAAUwB0AHUAZABpAG8AdwB3AHcALgBzAHkAbgBjAGYAdQBzAGkAbwBuAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwAIVG9wLWljb24LZG93bi1hcnJvdzIKUFZfWm9vbW91dAlQVl9ab29taW4LUFZfRG93bmxvYWQLUFZfQm9va21hcmsJUFZfU2VhcmNoCFBWX1ByaW50C1BWX1ByZXZpb3VzB1BWX05leHQIUFZfQ2xvc2UMUFZfRml0VG9QYWdlB1BWX09wZW4AAA==)
    format("truetype");
}
</style>
