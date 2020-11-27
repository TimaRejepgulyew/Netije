<template>
  <DxToolbar>
    <DxItem
      locateInMenu="auto"
      :options="saveButtonOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      locateInMenu="auto"
      :options="saveAndBackButtonOptions"
      location="before"
      widget="dxButton"
    />
  </DxToolbar>
</template>

<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import saveIcon from "~/static/icons/save.svg";
import saveAndCloseIcon from "~/static/icons/save-and-close.svg";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  computed: {
    saveButtonOptions() {
      return {
        icon: saveIcon,
        onClick: async () => {
          this.$emit("save");
        }
      };
    },
    saveAndBackButtonOptions() {
      return {
        icon: saveAndCloseIcon,
        hint: this.$t("buttons.saveAndBack"),
        onClick: async () => {
          this.$emit("saveAndBack");
        }
      };
    }
  }
};
</script>

<style></style>
