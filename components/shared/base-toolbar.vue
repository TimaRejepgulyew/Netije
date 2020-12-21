<template>
  <DxToolbar class="toolbar">
    <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
    <DxItem :options="exchangeOptions" location="before" widget="dxButton" />
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
  props: ["canSave", "canExchange", "isCard"],
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
    },
    exchangeOptions() {
      return {
        icon: "preferences",
        visible: this.canExchange,
        hint: this.$t("exchange.exchangeOptions"),
        useSubmitBehavior: true,
        onClick: e => {
          this.$emit("openExchangeOptions");
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