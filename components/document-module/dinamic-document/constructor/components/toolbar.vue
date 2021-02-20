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
      <DxItem
        :options="removeDocumentButtonOptions"
        location="after"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
//servises
import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
//components
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
//icons
import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    DxButton,
    DxToolbar,
    DxItem,
  },
  props: ["isCard", "fieldIndex", "documentType"],
  inject: ["trySaveDocumentType"],
  data() {
    return {
      saveIcon,
      saveAndCloseIcon,
    };
  },
  computed: {
    addFieldButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.addNewElement(this, this.documentType);
        },
        icon: "plus",
        text: this.$t("dinamicDocuments.buttons.addField"),
      };
    },
    removeFieldButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.removeElement(
            this,
            this.documentType,
            this.fieldIndex
          );
        },
        icon: "trash",
        text: this.$t("dinamicDocuments.buttons.removeField"),
      };
    },
    createFieldUnderButtonOptions() {
      return {
        onClick: this.$store.dispatch(
          "dinamic-documents/create/addField",
          this.fieldIndex
        ),
        icon: "plus",
        text: this.$t("dinamicDocuments.addFieldUnderUnder"),
      };
    },
    isDataChanged() {
      return this.$store.getters[
        `dinamicType/${this.documentType}/isDataChanged`
      ];
    },
    canUpdate() {
      return false;
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {
          await this.trySaveDocumentType();
        },
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate || !this.isDataChanged,
        onClick: async () => {},
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
        onClick: () => {},
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
