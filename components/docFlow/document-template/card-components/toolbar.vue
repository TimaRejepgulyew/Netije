<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        :options="saveButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :options="saveAndBackButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :options="refreshButtonOptions"
        :visible="!isDataChanged"
        location="before"
        widget="dxButton"
      />
      <DxItem :options="versionOptions" location="after" widget="dxButton" />
      <DxItem template="toolbarItemAccessRight" location="after" />
      <template #toolbarItemAccessRight>
        <toolbar-item-access-right
          :entity-type="entityType"
          :entity-id="documentId"
        />
      </template>
      <DxItem
        template="toolbarItemCreateVersion"
        locateInMenu="auto"
        :visible="!hasVersions && canUpdate"
        location="before"
      />
      <template #toolbarItemCreateVersion>
        <toolbarItemCreateVersion :documentId="documentId" />
      </template>
      <DxItem
        :options="previewButtonOptions"
        locateInMenu="auto"
        :visible="canBeOpenedWithPreview"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :options="editButtonOptions"
        locateInMenu="auto"
        :visible="canEditVersion"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="canDelete"
        :options="removeDocumentButtonOptions"
        location="after"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
//servises
import { refresh } from "~/infrastructure/services/documentService.js";
import DocumentVersionViewer, {
  canEdit
} from "~/infrastructure/services/documentVersionViewer.js";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
//components
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import toolbarItemCreateVersion from "~/components/document-module/main-doc-form/toolbar/create-version-btn.vue";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import toolbarItemAccessRight from "~/components/access-right/entity-access-right/access-right.vue";

//constants
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import dataApi from "~/static/dataApi";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
//icons
import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    toolbarItemUploadVersion,
    toolbarItemAccessRight,
    toolbarItemCreateVersion,
    DxButton,
    DxToolbar,
    DxItem
  },
  props: ["isCard", "documentId"],
  inject: ["trySaveDocument"],
  data() {
    return {
      saveIcon,
      saveAndCloseIcon,
      backButtonOptions: {
        type: "back",
        onClick: () => {
          this.$router.go(-1);
        }
      }
    };
  },
  computed: {
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.document.id}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    canBeOpenedWithPreview() {
      return this.document.canBeOpenedWithPreview;
    },
    canEditVersion() {
      return (
        canEdit(this.document.extension) &&
        this.canUpdate &&
        this.document.canBeOpenedWithPreview
      );
    },
    hasVersions() {
      return this.document.hasVersions;
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    entityType() {
      return mapToEntityType(this.document.documentTypeGuid);
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    canRegister() {
      return (
        this.$store.getters[`documents/${this.documentId}/canRegister`] &&
        this.$store.getters[`documents/${this.documentId}/canUpdate`]
      );
    },
    canDelete() {
      return (
        this.$store.getters[`documents/${this.documentId}/canDelete`] &&
        !this.isNew
      );
    },
    previewButtonOptions() {
      return {
        text: this.$t("buttons.read"),
        hint: this.$t("buttons.read"),
        icon: "pdffile",
        onClick: () => {
          DocumentVersionViewer({
            context: this,
            options: {
              readOnly: true,
              extension: this.document.extension,
              params: { documentId: this.documentId }
            },
            lastVersion: true
          });
        }
      };
    },
    editButtonOptions() {
      return {
        text: this.$t("buttons.edit"),
        hint: this.$t("buttons.edit"),
        icon: "edit",
        onClick: () => {
          DocumentVersionViewer({
            context: this,
            options: {
              readOnly: false,
              extension: this.document.extension,
              params: { documentId: this.document.id }
            },
            lastVersion: true,
            listeners: [
              { eventName: "valueChanged", handlerName: "pasteVersion" }
            ]
          });
        }
      };
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {
          await this.trySaveDocument();
        }
      };
    },
    versionOptions() {
      return {
        icon: "unselectall",
        hint: this.$t("buttons.versions"),
        text: this.$t("buttons.versions"),
        onClick: () => {
          this.$emit("openVersion");
        }
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {
          if (await this.trySaveDocument()) this.$emit("onClose");
        }
      };
    },
    removeDocumentButtonOptions() {
      return {
        icon: "trash",
        type: "normal",
        hint: this.$t("document.remove"),
        onClick: () => {
          let result = confirm(
            this.$t("shared.areYouSure"),
            this.$t("shared.confirm")
          );
          result.then(dialogResult => {
            if (dialogResult) {
              this.$awn.asyncBlock(
                this.$store.dispatch(`documents/${this.documentId}/delete`),
                e => {
                  this.$emit("onRemove");
                  this.$awn.success();
                },
                e => {
                  this.$awn.alert();
                }
              );
            }
          });
        }
      };
    },
    refreshButtonOptions() {
      return {
        icon: "refresh",
        onClick: () => {
          const { documentTypeGuid, id } = this.document;
          this.$awn.asyncBlock(
            refresh(this, { documentTypeGuid, documentId: id }),
            () => {}
          );
        }
      };
    }
  },
  methods: {
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
          this.$awn.success();
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
        () => {
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    }
  }
};
</script>
<style scoped>
.navBar {
  margin: 5px 0px;
}
</style>
