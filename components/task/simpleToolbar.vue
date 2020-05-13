<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="refreshButtonOptions" location="after" widget="dxButton" />
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
        type: "normal",
        icon: "back",
        text: this.$t("buttons.back"),
        onClick: () => {
          this.$router.go(-1);
        }
      }
    };
  },
  computed: {
    refreshButtonOptions() {
      return {
        icon: "refresh",
        onClick: () => {
          this.$awn.asyncBlock(
            this.$store.dispatch("currentTask/reload", this.$route.params.id),
            e => {}
          );
        }
      };
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
