<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem widget="dxButton" location="before" :options="backButtonOptions" />
      <DxItem
        :visible="isNew"
        locateInMenu="auto"
        :options="saveButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="isNew"
        locateInMenu="auto"
        :options="saveAndBackButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        v-if="isNew"
        locateInMenu="auto"
        :options="addFieldButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="isNew"
        locateInMenu="auto"
        :options="createFieldUnderButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="fieldIndex !== null && isNew"
        locateInMenu="auto"
        :options="removeFieldButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem :options="removeDocumentButtonOptions" location="after" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
//servises
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
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
        `dynamicDocumentComponents/${this.documentType}/isNew`
      ];
    },
    isDataChanged() {
      return this.$store.getters[
        `dynamicDocumentComponents/${this.documentType}/isDataChanged`
      ];
    },
    addFieldButtonOptions() {
      return {
        onClick: () => {
          DynamicTypeControler.addNewElement(this, this.documentType);
        },
        icon: "plus",
        text: this.$t("dynamicDocuments.buttons.addField")
      };
    },
    backButtonOptions() {
      return {
        onClick: () => {
          this.$router.go(-1);
        },
        stylingMode: "text",
        icon: "back"
      };
    },
    removeFieldButtonOptions() {
      return {
        onClick: () => {
          DynamicTypeControler.removeElement(
            this,
            this.documentType,
            this.fieldIndex
          );
          this.$emit("clearIndex");
        },
        icon: "trash",
        text: this.$t("dynamicDocuments.buttons.removeField")
      };
    },
    createFieldUnderButtonOptions() {
      return {
        onClick: () => {
          DynamicTypeControler.addNewElement(
            this,
            this.documentType,
            this.fieldIndex
          );
        },
        icon: "plus",
        visible: this.fieldIndex,
        text: this.$t("dynamicDocuments.buttons.addFieldUnder")
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
            this.$emit("close");
          } catch (error) {
            console.log("error", error);
          }
        }
      };
    },
    removeDocumentButtonOptions() {
      return {
        icon: "trash",
        type: "normal",
        hint: this.$t("document.remove"),
        visible: this.isNew,
        onClick: () => {
          let result = confirm(
            this.$t("shared.areYouSure"),
            this.$t("shared.confirm")
          );
          result.then(dialogResult => {
            if (dialogResult) {
              this.$awn.asyncBlock(
                DynamicTypeControler.removeType(this, this.documentType),
                e => {
                  this.$emit("close");
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
        onClick: () => {}
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
