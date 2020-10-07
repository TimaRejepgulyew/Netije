<template>
  <DxToolbar>
    <DxItem
      :options="btnSaveFileOptions"
      location="before"
      :disabled="isFilesEmpty"
      widget="dxButton"
    />
    <DxItem
      :options="btnDeleteOptions"
      :disabled="!hasActivePage || isFilesEmpty"
      location="after"
      widget="dxButton"
    />
    <DxItem
      :disabled="!hasActivePage || isFilesEmpty"
      :options="btnRotateLeftOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :disabled="!hasActivePage || isFilesEmpty"
      :options="btnRotateRightOptions"
      location="before"
      widget="dxButton"
    />
  </DxToolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import scanner from "~/static/icons/scanner/scanner.svg";
import rotateLeft from "~/static/icons/scanner/rotateLeft.svg";
import rotateRight from "~/static/icons/scanner/rotateRight.svg";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem,
  },
  methods: {
    ...mapActions({
      rotatePage: "scanner/rotatePage",
      saveFile: "scanner/saveFile",
      scanDocument: "scanner/scanDocument",
      deletePage: "scanner/deletePage",
    }),
  },
  computed: {
    ...mapGetters({
      isFilesEmpty: "scanner/isFilesEmpty",
    }),
    hasActivePage() {
      return this.$store.getters["scanner/currentPageId"] !== null;
    },
    btnSaveFileOptions() {
      return {
        icon: "save",
        text: this.$t("buttons.save"),
        onClick: () => {
          this.saveFile();
          this.$emit("fileSaved");
        },
      };
    },
    btnDeleteOptions() {
      return {
        icon: "trash",
        onClick: () => {
          this.deletePage();
        },
      };
    },
    btnRotateRightOptions() {
      return {
        icon: rotateRight,
        text: this.$t("buttons.rotateRight"),
        onClick: () => {
          this.rotatePage(90);
        },
      };
    },
    btnRotateLeftOptions() {
      return {
        icon: rotateLeft,
        text: this.$t("buttons.rotateLeft"),
        onClick: () => {
          this.rotatePage(-90);
        },
      };
    },
  },
};
</script>

<style>
</style>