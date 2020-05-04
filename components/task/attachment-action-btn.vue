<template>
  <DxDropDownButton
    :items="btnType"
    text="..."
    @item-click="onItemClick"
  />
</template>

<script>
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  props: ["document"],
  data() {
    return {
      btnType: [
        {
          visible: this.document.preview,
          icon: "preview",
          name: this.$t("translations.links.preview")
        },
        {
          visible: this.document.hasFile,
          icon: "download",
          name: this.$t("translations.links.download")
        },
        {
          visible: this.document.allowDeleting,
          icon: "delete",
          name: this.$t("translations.links.delete")
        }
      ]
    };
  }
};
</script>

<style>
</style>