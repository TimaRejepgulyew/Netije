<template>
  <DxToolbar class="toolbar">
    <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
    <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
  </DxToolbar>
</template>
<script>
import { DxButtonItem } from "devextreme-vue/form";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  props: ["canSave", "isCard"],
  data() {
    return {
      backButtonOptions: {
        visible: !this.isCard,
        type: "normal",
        icon: "back",
        text: this.$t("shared.back"),
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
        visible: this.canSave,
        useSubmitBehavior: true,
        onClick: e => {
          this.$emit("saveChanges");
        }
      };
    }
  }
};
</script>
<style scoped>
.toolbar {
  background-color: transparent;
  margin-bottom: 10px;
}
</style>