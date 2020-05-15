<template>
  <div class="navBar">
    <DxPopup
      :visible.sync="accessRightPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="800"
      :height="'auto'"
      :title="$t('translations.fields.accessRightDocument')"
    >
      <div>
        <access-right :url="accessRightUrl" />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="canRegister" location="before" template="registrationButton" />
      <DxItem
        :visible="canDelete"
        :options="removeDocumentButtonOptions"
        location="after"
        widget="dxButton"
      />
      <DxItem
        :options="documentAccessRightsButtonOptions"
        v-if="isUpdating"
        location="after"
        widget="dxButton"
      />

      <template #registrationButton>
        <document-registration-btn />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi";
import accessRight from "~/components/paper-work/main-doc-form/access-right.vue";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import DocumentRegistrationBtn from "~/components/paper-work/main-doc-form/document-registration-btn";
export default {
  components: {
    accessRight,
    DxPopup,
    DxButton,
    DxToolbar,
    DxItem,
    DocumentRegistrationBtn
  },
  data() {
    return {
      accessRightUrl: dataApi.accessRights.forDocument + this.$route.params.id,
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
    canDelete() {
      return this.$store.getters["currentDocument/canDelete"];
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