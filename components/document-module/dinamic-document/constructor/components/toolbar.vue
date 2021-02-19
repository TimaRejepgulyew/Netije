<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem locateInMenu="auto" :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem
        locateInMenu="auto"
        :options="saveAndBackButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :options="addFieldButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="fieldIndex !== null"
        locateInMenu="auto"
        :options="removeFieldButtonOptions"
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
      <DxItem :options="removeDocumentButtonOptions" location="after" widget="dxButton" />
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

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
export default {
  components: {
    DxButton,
    DxToolbar,
    DxItem
  },
  props: ["isCard", "fieldIndex", "storeId"],
  // inject: ["trySaveDocument"],
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
    addFieldButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.addNewElement(this, this.storeId);
        },
        icon: "plus",
        text: this.$t("dinamicDocuments.buttons.addField")
      };
    },
    removeFieldButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.removeElement(
            this,
            this.storeId,
            this.fieldIndex
          );
        },
        icon: "trash",
        text: this.$t("dinamicDocuments.buttons.removeField")
      };
    },
    createFieldUnderButtonOptions() {
      return {
        onClick: this.$store.dispatch(
          "dinamic-documents/create/addField",
          this.fieldIndex
        ),
        icon: "plus",
        text: this.$t("dinamicDocuments.addFieldUnderUnder")
      };
    },
    isDataChanged() {
      return this.$store.getters[`dinamicType/${this.storeId}/isDataChanged`];
    },
    canUpdate() {
      return false;
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {}
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {}
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
  }
};
</script>
<style scoped>
.navBar {
  margin: 5px 0px;
}
</style>
