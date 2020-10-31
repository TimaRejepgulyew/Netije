<template>
  <DxToolbar>
    <DxItem
      :options="btnSaveFileOptions"
      location="before"
      :disabled="isFilesEmpty"
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
    <DxItem
      :disabled="!hasActivePage || isFilesEmpty"
      :options="btnOrderUpOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :disabled="!hasActivePage || isFilesEmpty"
      :options="btnOrderDownOptions"
      location="before"
      widget="dxButton"
    />
    <DxItem
      :options="btnDeleteOptions"
      :disabled="!hasActivePage || isFilesEmpty"
      location="before"
      widget="dxButton"
    />
  </DxToolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import scanner from "~/static/icons/scanner/scanner.svg";
import orderUp from "~/static/icons/scanner/order-up.svg";
import orderDown from "~/static/icons/scanner/order-down.svg";
import rotateLeft from "~/static/icons/scanner/rotateLeft.svg";
import rotateRight from "~/static/icons/scanner/rotateRight.svg";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  methods: {
    ...mapActions({
      rotatePage: "scanner/rotatePage",
      saveFile: "scanner/saveFile",
      scanDocument: "scanner/scanDocument",
      deletePage: "scanner/deletePage",
      setOrderUp: "scanner/setOrderUp",
      setOrderDown: "scanner/setOrderDown"
    })
  },
  computed: {
    ...mapGetters({
      isFilesEmpty: "scanner/isFilesEmpty",
      currentPage: "scanner/currentPage",
      files: "scanner/files"
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
        }
      };
    },
    btnDeleteOptions() {
      return {
        icon: "trash",
        onClick: () => {
          this.deletePage();
        }
      };
    },
    btnRotateRightOptions() {
      return {
        icon: rotateRight,
        text: this.$t("buttons.rotateRight"),
        onClick: () => {
          this.rotatePage(90);
        }
      };
    },
    btnRotateLeftOptions() {
      return {
        icon: rotateLeft,
        text: this.$t("buttons.rotateLeft"),
        onClick: () => {
          this.rotatePage(-90);
        }
      };
    },
    btnOrderUpOptions() {
      return {
        icon: orderUp,
        text: this.$t("buttons.orderUp"),
        disabled: this.currentPage?.order === 1,
        onClick: () => {
          this.setOrderUp();
        }
      };
    },
    btnOrderDownOptions() {
      return {
        icon: orderDown,
        text: this.$t("buttons.orderDown"),
        disabled: this.currentPage?.order === this.files.length,
        onClick: () => {
          this.setOrderDown();
        }
      };
    }
  }
};
</script>

<style></style>
