<template>
  <div class="attachment-btn">
    <DxDropDownButton
      styling-mode="text"
      icon="overflow"
      :showArrowIcon="false"
      :drop-down-options="{ width: 230 }"
      :items="btnType"
      display-expr="name"
      @item-click="onItemClick"
    />
  </div>
</template>

<script>
import DocumentVersionViewer, {
  canEdit,
} from "~/infrastructure/services/documentVersionViewer.js";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import DocumentVersionService from "~/infrastructure/services/documentVersionService";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
export default {
  components: {
    DxDropDownButton,
  },
  props: ["version", "documentId", "isProtected"],
  computed: {
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    btnType() {
      return [
        {
          type: "edit",
          visible:
            !this.virusDetected &&
            canEdit(this.version.extension) &&
            this.canUpdate,
          icon: "edit",
          name: this.$t("buttons.edit"),
        },
        {
          type: "preview",
          visible: !this.virusDetected && this.version.canBeOpenedWithPreview,
          icon: "pdffile",
          name: this.$t("buttons.preview"),
        },
        {
          type: "download",
          visible: !this.virusDetected,
          icon: "download",
          name: this.$t("buttons.download"),
        },
        {
          type: "delete",
          visible: this.$store.getters[
            `documents/${this.documentId}/fullAccess`
          ],
          icon: "trash",
          name: this.$t("buttons.delete"),
        },
      ];
    },
  },
  methods: {
    onItemClick(e) {
      switch (e.itemData.type) {
        case "edit":
          this.editVersion();
          break;
        case "preview":
          this.previewVersion();
          break;
        case "download":
          this.downloadVersion();
          break;
        case "delete":
          this.deleteVersion();
      }
    },
    pasteVersion({ file, extension }) {
      switch (extension) {
        case ".docx":
          this.pasteDocxVersion({ file });
          break;
        case ".xlsx":
          this.pasteXlsXVersion({ file });
          break;
        default:
          throw "can't paste this file ";
      }
    },
    pasteXlsXVersion({ file }) {
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
    uploadVersion() {
      this.$emit("uploadVersion");
    },
    pasteDocxVersion({ file }) {
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
    editVersion() {
      DocumentVersionViewer({
        context: this,
        options: {
          readOnly: false,
          extension: this.version.extension,
          params: { versionId: this.version.id },
        },
        lastVersion: false,
        listeners: [{ eventName: "valueChanged", handlerName: "pasteVersion" }],
      });
    },
    previewVersion() {
      DocumentVersionViewer({
        context: this,
        options: {
          readOnly: true,
          extension: this.version.extension,
          params: { versionId: this.version.id },
        },
        lastVersion: false,
      });
    },
    downloadVersion() {
      DocumentVersionService.downloadVersion(this, {
        id: this.version.id,
        name: this.document.name,
        extension: this.version.extension,
      });
    },
    async deleteVersion() {
      const response = await confirm(
        this.$t("document.confirmMessage.sureDeleteVersion"),
        this.$t("shared.confirm")
      );
      if (!response) {
        return false;
      } else
        this.$awn.asyncBlock(
          this.$store.dispatch(
            `documents/${this.documentId}/removeVersion`,
            this.version.id
          ),
          () => {
            this.$store.dispatch(
              `documents/${this.documentId}/updateLastVersion`
            ),
              this.$emit("uploadVersion");
          }
        );
    },
  },
};
</script>

<style lang="scss">
.attachment-btn {
  .dx-overlay {
    z-index: 9999;
  }
}
</style>
