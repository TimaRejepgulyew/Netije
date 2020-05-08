<template>
  <div class="navBar">
    <slot />
    <document-registration-btn
      :canRegister="canRegister"
      :registrationState="registrationState"
      :isDataChanged="isDataChanged"
    />
  </div>
</template>
<script>
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import DocumentRegistrationBtn from "~/components/paper-work/main-doc-form/document-registration-btn";
export default {
  components: {
    DxButton,
    DocumentRegistrationBtn
  },
  props: ["canRegister", "isDataChanged", "registrationState"]
};
</script>