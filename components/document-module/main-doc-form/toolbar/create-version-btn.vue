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
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import { DxButton } from "devextreme-vue";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import DocumentVersionViewer from "~/infrastructure/services/documentVersionViewer.js";
export default {
  components: {
    DxButton,
    DxDropDownButton,
    toolbarItemUploadVersion,
  },
  inject: ["trySaveDocument"],
  props: ["documentId"],
  computed: {
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    canUpdate() {
      let canUpdate = this.$store.getters[
        `documents/${this.documentId}/canUpdate`
      ];
      let isNew = this.$store.getters[`documents/${this.documentId}/isNew`];
      if (isNew) {
        let hasVersions = this.$store.getters[
          `documents/${this.documentId}/document`
        ].hasVersions;
        return canUpdate && !hasVersions;
      }
      return canUpdate;
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
          disabled: this.isNew,
          type: "documentTemplate",
          name: this.$t("buttons.fromTemplate"),
          icon: "doc",
          visible: this.$store.getters["modulesConfig/getTemplate"],
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
    uploadVersion(data) {
      this.$store.dispatch(`documents/${this.documentId}/setVersion`, data);
      if (!this.isNew) {
        if (DocumentTypeGuid.OutgoingLetter === this.document.documentTypeGuid)
          this.$store.dispatch(`documents/${this.documentId}/updateExchange`, {
            documentId: this.document.id,
            documentTypeGuid: this.document.documentTypeGuid,
          });
      }
      this.$emit("uploadVersion");
      this.$awn.success();
    },
    pasteVersionFromScanner({ file }) {
      this.$awn.async(
        documentVersionService.createVersionFromFile(
          this.document,
          file,
          this,
          "test.pdf"
        ),
        (res) => {
          this.uploadVersion(res.data);
        },
        () => {}
      );
    },
    pasteXlsXVersion({ file }) {
      this.$awn.asyncBlock(
        documentVersionService.createVersionFromSpreadSheet(
          this,
          this.document,
          file
        ),
        (res) => {
          this.uploadVersion(res.data);
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    pasteFromTemplate({ id: templateId }) {
      const params = { templateId, documentId: this.documentId };
      this.$awn.asyncBlock(
        documentVersionService.createVersionFromTemplate(this, params),
        (res) => {
          this.uploadVersion(res.data);
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    pasteDocxVersion({ file }) {
      this.$awn.asyncBlock(
        documentVersionService.createVersionFromDocumentEditor(
          this.document,
          file,
          this,
          "test.docx"
        ),
        (res) => {
          this.uploadVersion(res.data);
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    async createDocumentTemplate() {
      if (await this.trySaveDocument()) {
        this.$popup.documentTemplateGrid(
          this,
          {
            documentId: this.documentId,
          },
          {
            showLoadingPanel: false,
            listeners: [
              {
                eventName: "valueChanged",
                handlerName: "pasteFromTemplate",
              },
            ],
          }
        );
      }
    },
    createDocxFile() {
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
    },
    createExcelFile() {
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
    },
    onItemClick(e) {
      const type = e.itemData.type;
      switch (type) {
        case "upload":
          this.$refs.toolbarItemUploadVersion.$el.click();
          break;
        case "scaner":
          this.$popup.scannerDialog(
            this,
            {
              documentId: this.documentId,
            },
            {
              listeners: [
                {
                  eventName: "valueChanged",
                  handlerName: "pasteVersionFromScanner",
                },
              ],
            }
          );
          break;
        case "scaner":
          this.$popup.scannerDialog(
            this,
            {
              documentId: this.documentId,
            },
            {
              listeners: [
                {
                  eventName: "valueChanged",
                  handlerName: "pasteVersionFromScanner",
                },
              ],
            }
          );
          break;
        case "documentTemplate":
          this.createDocumentTemplate();
          break;
        case "docxfile":
          this.createDocxFile();
          break;
        case "xlsxfile":
          this.createExcelFile();
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
          break;
      }
    },
  },
};
</script>

<style lang="scss"></style>
