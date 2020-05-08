<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem location="before" template="registrationButton" />
      <template #registrationButton>
        <document-registration-btn
          :canRegister="canRegister"
          :registrationState="registrationState"
          :isDataChanged="isDataChanged"
        />
      </template>
      <!-- <slot />
      <document-registration-btn
        :canRegister="canRegister"
        :registrationState="registrationState"
        :isDataChanged="isDataChanged"
      />-->
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
  props: ["canRegister", "isDataChanged", "registrationState"],
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
    saveButtonOptions() {
      return {
        icon: "save",
        type:"success",
        disabled: !this.isDataChanged,
        onClick: () => {
          this.$emit("saveChanges");
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