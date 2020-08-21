<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem :visible="!isCard" :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem locateInMenu="auto" :options="saveButtonOptions" location="before" widget="dxButton" />
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
        locateInMenu="auto"
        :visible="canRegister"
        location="before"
        template="toolbarItemRegistration"
      />
      <template #toolbarItemRegistration>
        <toolbar-item-registration :documentId="documentId" />
      </template>
      <DxItem
        locateInMenu="auto"
        template="toolbarItemRelation"
        v-if="!isNew"
        location="before"
        widget="dxButton"
      />
      <template #toolbarItemRelation>
        <toolbar-item-relation :documentId="documentId" />
      </template>
      <DxItem
        locateInMenu="auto"
        template="toolbarItemavailableActions"
        :visible="!isDataChanged"
        location="before"
      />
      <template #toolbarItemavailableActions>
        <toolbar-item-available-actions :documentId="documentId" />
      </template>
      <DxItem :options="versionOptions" location="after" widget="dxButton" />
      <DxItem template="toolbarItemAccessRight" location="after" />
      <template #toolbarItemAccessRight>
        <toolbar-item-access-right :entity-type="entityType" :entity-id="documentId" />
      </template>
      <DxItem
        template="toolbarItemUploadVersion"
        locateInMenu="auto"
        :visible="!hasVersions"
        location="before"
      />
      <template #toolbarItemUploadVersion>
        <toolbar-item-upload-version :documentId="documentId" />
      </template>
      <DxItem
        :options="previewButtonOptions"
        locateInMenu="auto"
        :visible="canBeOpenedWithPreview"
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
import { load } from "~/infrastructure/services/documentService.js";
import documentService from "~/infrastructure/services/documentVersionService.js";
//components
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import toolbarItemRegistration from "~/components/document-registration/registration-button.vue";
// import toolbarItemRegistration from "~/components/document-module/main-doc-form/toolbar/document-registration-btn";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import toolbarItemRelation from "~/components/document-module/main-doc-form//toolbar/create-relation.vue";
import toolbarItemAccessRight from "~/components/page/access-right.vue";
import toolbarItemAvailableActions from "~/components/document-module/main-doc-form/toolbar/available-actions.vue";
//constants
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import dataApi from "~/static/dataApi";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
//icons
import addendumIcon from "~/static/icons/addendum.svg";
import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    toolbarItemUploadVersion,
    toolbarItemAccessRight,
    toolbarItemRegistration,
    toolbarItemAvailableActions,
    toolbarItemRelation,
    DxButton,
    DxToolbar,
    DxItem,
  },
  props: ["isCard", "documentId"],
  data() {
    return {
      addendumIcon,
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
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    canBeOpenedWithPreview() {
      return this.document.canBeOpenedWithPreview;
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
      return (
        this.isDataChanged &&
        this.$store.getters[`documents/${this.documentId}/canUpdate`]
      );
    },
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    canRegister() {
      return this.$store.getters[`documents/${this.documentId}/canRegister`];
    },
    canDelete() {
      return this.$store.getters[`documents/${this.documentId}/canDelete`];
    },
    previewButtonOptions() {
      return {
        icon: "pdffile",
        onClick: () => {
          documentService.previewDocument(this.document, this);
        },
      };
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate,
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch(`documents/${this.documentId}/save`),
              (res) => {
                this.$awn.success();
              },
              (e) => {
                this.$awn.alert();
              }
            );
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
    validateForm() {
      return this.$parent.$refs["form"].instance.validate().isValid;
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,

        hint: this.$t("buttons.saveAndBack"),
        disabled: !this.canUpdate,
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch(`documents/${this.documentId}/save`),
              (res) => {
                this.$awn.success();
                this.$emit("onSave", { back: true });
                this.$router.go(-1);
              },
              (e) => {
                this.$awn.alert();
              }
            );
        },
      };
    },
    createAddendumOptions() {
      return {
        icon: this.addendumIcon,
        type: "normal",
        hint: this.$t("buttons.createAddendum"),
        onClick: () => {
          this.$router.push({
            path: `/paper-work/create/${DocumentTypeGuid.Addendum}`,
            query: { leadingDocument: this.$route.params.id },
          });
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
                this.$store.dispach(`documents/${this.documentId}/delete`),
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
          this.$awn.asyncBlock(load(this, { documentTypeGuid, id }), () => {});
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