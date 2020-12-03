<template>
  <div>
    <DxDropDownButton
      :use-select-mode="false"
      :items="profileSettings"
      :text="$t('buttons.createVersion')"
      :icon="profileSettings.icon"
      display-expr="name"
      key-expr="id"
      :visible="canUpdate"
      :dropDownOptions="{
        width: '200px',
      }"
      @item-click="onItemClick"
    >
    </DxDropDownButton>
    <toolbarItemUploadVersion
      :documentId="documentId"
      @uploadVersion="uploadVersion"
      ref="toolbarItemUploadVersion"
    />
  </div>
</template>

<script>
import DxDropDownButton from "devextreme-vue/drop-down-button";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import { click } from "@syncfusion/ej2-vue-spreadsheet";
import DocumentVersionViewer from "~/infrastructure/services/documentVersionViewer.js";
export default {
  components: {
    DxButton,
    DxDropDownButton,
    toolbarItemUploadVersion,
  },
  props: ["documentId"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    profileSettings() {
      return [
        {
          id: 1,
          type: "upload",
          name: this.$t("buttons.upload"),
          icon: "upload",
        },
        {
          id: 2,
          temp: "toolbarItemUploadVersion",
          type: "scaner",
          name: this.$t("buttons.fromScaner"),
          icon: "print",
        },
        {
          id: 3,
          disabled: true,
          type: "doc",
          name: this.$t("buttons.fromTemplate"),
          icon: "doc",
        },
        {
          id: 4,
          type: "docxfile",
          name: this.$t("buttons.fromDocx"),
          icon: "docxfile",
        },
        {
          id: 5,
          type: "xlsxfile",
          name: this.$t("buttons.fromXlsx"),
          icon: "xlsxfile",
        },
      ];
    },
  },
  methods: {
    uploadVersion() {
      this.$emit("uploadVersion");
    },
    pasteXlsXVersion({ file }) {
      console.log(file);
      this.$awn.asyncBlock(
        documentVersionService.createVersionFromSpreadSheet(
          this,
          this.document,
          file
        ),
        () => {
          this.uploadVersion();
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    pasteDocxVersion({ file }) {
      console.log(file);
      this.$awn.asyncBlock(
        documentVersionService.createVersionFromDocumentEditor(
          this.document,
          file,
          this,
          "test.docx"
        ),
        () => {
          this.uploadVersion();
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    onItemClick(e) {
      const type = e.itemData.type;
      switch (type) {
        case "upload":
          this.$refs.toolbarItemUploadVersion.$el.click();
          break;
        case "scaner":
          this.$popup.scannerDialog(this, {
            documentId: this.documentId,
          });
          break;
        case "docxfile":
          DocumentVersionViewer({
            context: this,
            options: {
              readOnly: false,
              extension: ".docx",
              params: {
                documentId: this.documentId,
              },
            },
            isNew: true,
            listeners: [
              { eventName: "valueChanged", handlerName: "pasteDocxVersion" },
            ],
          });
          break;
        case "xlsxfile":
          DocumentVersionViewer({
            context: this,
            options: {
              readOnly: false,
              extension: ".xlsx",
              params: {
                documentId: this.documentId,
              },
            },
            isNew: true,
            listeners: [
              { eventName: "valueChanged", handlerName: "pasteXlsXVersion" },
            ],
          });
          break;
        default:
          console.log(type);
          break;
      }
    },
  },
  mounted() {
    console.log(this.canUpdate);
  },
};
</script>

<style lang="scss"></style>
