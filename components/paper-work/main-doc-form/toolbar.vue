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
      <DxItem :options="documentAccessRightsButtonOptions" location="after" widget="dxButton" />

      <template #registrationButton>
        <document-registration-btn />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import DocumentRegistrationBtn from "~/components/paper-work/main-doc-form/document-registration-btn";
export default {
  components: {
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
        onClick: () => {}
      };
    },
    documentAccessRightsButtonOptions() {
      return {
        icon: "key",
        type: "normal",
        text: this.$t("shared.access"),
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