<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="saveAndBackButtonOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxToolbar,
    DxItem
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
    saveButtonOptions() {
      return {
        icon: "save",
        type: "success",
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
        onClick: () => {
          this.$emit("saveChanges", true);
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