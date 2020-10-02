<template>
  <DxToolbar>
    <DxItem :options="btnSaveFileOptions" location="before" widget="dxButton" />
    <DxItem
      :options="btnScannerDocumentOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :vasible="hasActivePage"
      :options="btnRotateLeftOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :vasible="hasActivePage"
      :options="btnRotateRightOptions"
      location="before"
      widget="dxButton"
    />
  </DxToolbar>
</template>

<script>
import { mapActions } from "vuex";
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
    }),
  },
  computed: {
    hasActivePage() {
      return this.$store.getters["scanner/currentPageId"] != null;
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
    btnScannerDocumentOptions() {
      return {
        icon: scanner,
        text: this.$t("buttons.scanner"),
        onClick: () => {
          this.$scanner.scanDocument();
        },
      };
    },
  },
};
</script>

<style>
</style>