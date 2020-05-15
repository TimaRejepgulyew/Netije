<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="canRegister" location="before" template="registrationButton" />
      <DxItem
        :visible="canRemove"
        :options="removeDocumentButtonOptions"
        location="after"
        widget="dxButton"
      />
      <DxItem template="accessRightButton" v-if="isUpdating" location="after" />
      <template #accessRightButton>
        <access-right :url="accessRightUrl" />
      </template>
      <template #registrationButton>
        <document-registration-btn />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi";
import accessRight from "~/components/page/access-right.vue";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import DocumentRegistrationBtn from "~/components/paper-work/main-doc-form/document-registration-btn";
export default {
  components: {
    accessRight,
    DxButton,
    DxToolbar,
    DxItem,
    DocumentRegistrationBtn
  },
  data() {
    return {
      accessRightUrl: dataApi.accessRights.ForDocument + this.$route.params.id,
      accessRightPopup: false,
      backButtonOptions: {
        type: "back",
        onClick: () => {
          this.$router.go(-1);
        }
      }
    };
  },
  computed: {
    isUpdating() {
      return this.$route.params.id !== "add";
    },
    canUpdate() {
      return (
        this.$store.getters["currentDocument/canUpdate"] &&
        this.$store.getters["currentDocument/isDataChanged"]
      );
    },
    canRegister() {
      return this.$store.getters["currentDocument/canRegister"];
    },
    canRemove() {
      return this.$store.getters["currentDocument/canRemove"];
    },
    saveButtonOptions() {
      return {
        icon: "save",
        type: "success",
        disabled: !this.canUpdate,
        onClick: () => {
          this.$emit("saveChanges");
        }
      };
    },
    removeDocumentButtonOptions() {
      return {
        icon: "trash",
        type: "normal",
        text: this.$t("document.remove"),
        onClick: () => {
          let result = confirm(
            this.$t("shared.areYouSure"),
            this.$t("shared.confirm")
          );
          result.then(dialogResult => {
            if (dialogResult) {
              this.$awn.asyncBlock(
                this.$axios.delete(
                  dataApi.paperWork.DeleteDocument + this.$route.params.id
                ),
                e => {
                  this.$router.go(-1);
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
    documentAccessRightsButtonOptions() {
      return {
        icon: "key",
        type: "normal",
        text: this.$t("shared.access"),
        onClick: () => {
          this.accessRightPopup = true;
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