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




//components
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";

//constants
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";

import dataApi from "~/static/dataApi";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
//icons

import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    DxButton,
    DxToolbar,
    DxItem,
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
        },
      },
    };
  },
  computed: {
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
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
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {
          await this.trySaveDocument();
        },
      };
    },
    versionOptions() {
      return {
        icon: "unselectall",
        hint: this.$t("buttons.versions"),
        text: this.$t("buttons.versions"),
        onClick: () => {
          this.$emit("openVersion");
        },
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {
          if (await this.trySaveDocument()) this.$emit("onClose");
        },
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
          result.then((dialogResult) => {
            if (dialogResult) {
              this.$awn.asyncBlock(
                this.$store.dispatch(`documents/${this.documentId}/delete`),
                (e) => {
                  this.$emit("onRemove");
                  this.$awn.success();
                },
                (e) => {
                  this.$awn.alert();
                }
              );
            }
          });
        },
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
        },
      };
    },
  },
};
</script>
<style scoped>
.navBar {
  margin: 5px 0px;
}
</style>
