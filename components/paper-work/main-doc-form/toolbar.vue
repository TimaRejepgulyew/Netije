<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveAndBackButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="canRegister" location="before" template="registrationButton" />
      <DxItem
        :visible="canDelete"
        :options="removeDocumentButtonOptions"
        location="after"
        widget="dxButton"
      />
      <DxItem
        :visible="isUpdating"
        :options="createAddendumOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem template="accessRightButton" v-if="isUpdating" location="after" />
      <template #accessRightButton>
        <access-right :entity-type="entityType" :entity-id="documentId" />
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
      backButtonOptions: {
        type: "back",
        onClick: () => {
          this.$router.go(-1);
        }
      }
    };
  },
  computed: {
    documentId() {
      //TODO:Fix this
      return this.$route.params.id;
    },
    entityType() {
      return EntityType.ElectroonicDocument;
    },
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
    saveAndBackButtonOptions() {
      return {
        icon: "save",
        type: "success",
        text: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate,
        onClick: () => {
          this.$emit("saveChanges", true);
        }
      };
    },
    createAddendumOptions() {
      return {
        icon: "plus",
        type: "normal",
        text: this.$t("buttons.createAddendum"),
        onClick: () => {
          this.$router.push({
            path: "/paper-work/addendum/add",
            query: { leandingDocument: this.$route.params.id }
          });
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
    }
  }
};
</script>
<style scoped>
.navBar {
  margin: 5px 0px;
}
</style>