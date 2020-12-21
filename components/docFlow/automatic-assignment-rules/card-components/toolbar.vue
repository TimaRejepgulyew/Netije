<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem locateInMenu="auto" :options="saveButtonOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>

<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import saveIcon from "~/static/icons/save.svg";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  data() {
    return {
      saveIcon
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        icon: saveIcon,
        onClick: () => {
          this.$emit("trySave");
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