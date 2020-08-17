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
        template="registrationButton"
      />

      <DxItem
        locateInMenu="auto"
        template="createRelation"
        v-if="!isNew"
        location="before"
        widget="dxButton"
      />
      <template #createRelation>
        <create-relation :documentId="documentId" />
      </template>
      <DxItem
        locateInMenu="auto"
        template="createTaskForDocument"
        :visible="!isDataChanged"
        location="before"
      />
      <template #createTaskForDocument>
        <available-actions :documentId="documentId" />
      </template>
      <DxItem :options="versionOptions" location="after" widget="dxButton" />
      <DxItem template="accessRightButton" location="after" />
      <template #accessRightButton>
        <access-right :entity-type="entityType" :entity-id="documentId" />
      </template>
      <DxItem
        template="uploadVersion"
        locateInMenu="auto"
        :visible="!hasVersions"
        location="before"
      />
      <template #uploadVersion>
        <upload-version-button :documentId="documentId" />
      </template>
      <DxItem
        :options="previewButtonOptions"
        locateInMenu="auto"
        :visible="canBeOpenedWithPreview"
        location="before"
        widget="dxButton"
      />

      <template #registrationButton>
        <document-registration-btn :documentId="documentId" />
      </template>
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
import { load } from "~/infrastructure/services/documentService.js";
import documentService from "~/infrastructure/services/documentVersionService.js";
import uploadVersionButton from "~/components/paper-work/main-doc-form/upload-version-button.vue";
import createRelation from "~/components/paper-work/main-doc-form/create-relation.vue";
import addendumIcon from "~/static/icons/addendum.svg";
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
import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    uploadVersionButton,
    accessRight,
    DxButton,
    DxToolbar,
    DxItem,
    DocumentRegistrationBtn,
    availableActions,
    createRelation,
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