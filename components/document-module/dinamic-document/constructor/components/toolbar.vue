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
        locateInMenu="auto"
        :options="createFieldUnderButtonOptions"
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
      <!-- <DxItem
        locateInMenu="auto"
        :options="refreshButtonOptions"
        :visible="true"
        location="before"
        widget="dxButton"
      /> -->
      <DxItem :options="removeDocumentButtonOptions" location="after" widget="dxButton" />
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
    DxItem
  },
  props: ["isCard", "fieldIndex", "documentType"],
  inject: ["trySaveDocumentType"],
  data() {
    return {
      saveIcon,
      saveAndCloseIcon
    };
  },
  computed: {
    isNew() {
      return this.$store.getters[
        `dinamicDocumentComponents/${this.documentType}/isNew`
      ];
    },
    isDataChanged() {
      return this.$store.getters[
        `dinamicDocumentComponents/${this.documentType}/isDataChanged`
      ];
    },
    addFieldButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.addNewElement(this, this.documentType);
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
            this.documentType,
            this.fieldIndex
          );
        },
        icon: "trash",
        text: this.$t("dinamicDocuments.buttons.removeField")
      };
    },
    createFieldUnderButtonOptions() {
      return {
        onClick: () => {
          DinamicTypeControler.addNewElement(
            this,
            this.documentType,
            this.fieldIndex
          );
        },
        icon: "plus",
        visible: this.fieldIndex,
        text: this.$t("dinamicDocuments.buttons.addFieldUnder")
      };
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.isDataChanged,
        onClick: async () => {
          await this.trySaveDocumentType();
        }
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.isDataChanged,
        onClick: async () => {
          try {
            await this.trySaveDocumentType();
            this.$router.go(-1);
          } catch (error) {}
        }
      };
    },
    removeDocumentButtonOptions() {
      return {
        icon: "trash",
        type: "normal",
        hint: this.$t("document.remove"),
        visible: !this.isNew,
        onClick: () => {
          let result = confirm(
            this.$t("shared.areYouSure"),
            this.$t("shared.confirm")
          );
          result.then(dialogResult => {
            if (dialogResult) {
              this.$awn.asyncBlock(
                DinamicTypeControler.removeType(this, this.documentType),
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
