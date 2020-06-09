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
      <DxItem :options="createAddendumOptions" v-if="!isNew" location="before" widget="dxButton" />
      <DxItem template="createTaskForDocument" :visible="!isDataChanged" location="after" />
      <template #createTaskForDocument>
        <available-actions />
      </template>
      <DxItem template="accessRightButton" location="after" />
      <template #accessRightButton>
        <access-right
          :entity-type="entityType"
          :entity-id="$store.getters['currentDocument/document'].id"
        />
      </template>
      <template #registrationButton>
        <document-registration-btn />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import availableActions from "~/components/paper-work/main-doc-form/available-actions.vue";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
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
    DocumentRegistrationBtn,
    availableActions
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
    isNew() {
      return this.$store.getters["currentDocument/isNew"];
    },
    entityType() {
      console.log(mapToEntityType)
      return mapToEntityType(
        this.$store.getters["currentDocument/document"].documentTypeGuid
      );
    },
    canUpdate() {
      return (
        this.isDataChanged && this.$store.getters["currentDocument/canUpdate"]
      );
    },
    isDataChanged() {
      return this.$store.getters["currentDocument/isDataChanged"];
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
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch("currentDocument/save"),
              res => {
                this.$awn.success();
              },
              e => {
                this.$awn.alert();
              }
            );
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
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch("currentDocument/save"),
              res => {
                this.$awn.success();
                this.$router.go(-1);
              },
              e => {
                this.$awn.alert();
              }
            );
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
            path: `/paper-work/create/${DocumentTypeGuid.Addendum}`,
            query: { leadingDocument: this.$route.params.id }
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
                  `${dataApi.paperWork.DeleteDocument}${this.$store.getters["currentDocument/document"].documentTypeGuid}/${this.$store.getters["currentDocument/document"].id}`
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