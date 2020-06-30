<template>
  <DxDropDownButton
    styling-mode="text"
    icon="overflow"
    :showArrowIcon="false"
    v-if="hasActions"
    :drop-down-options="{ width: 230 }"
    :items="btnType"
    display-expr="name"
    @item-click="onItemClick"
  />
</template>

<script>
import DocumentService from "~/infrastructure/services/documentService";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDropDownButton
  },
  props: ["attachment"],
  data() {
    const canPreview =
      this.attachment?.hasVersions && this.attachment?.canBeOpenedWithPreview;

    return {
      btnType: [
        {
          type: "preview",
          visible: canPreview,
          icon: "pdffile",
          name: this.$t("buttons.preview")
        },
        {
          type: "download",
          visible: this.attachment?.hasVersions,
          icon: "download",
          name: this.$t("buttons.download")
        }
      ]
    };
  },
  computed: {
    hasActions() {
      return true;
      // return (
      //   (this.attachment?.hasVersions &&
      //     this.attachment?.canBeOpenedWithPreview) ||
      //   this.attachment.canDetach
      // );
    }
  },
  methods: {
    onItemClick(e) {
      switch (e.itemData.type) {
        case "preview":
          this.previewDocument();
          break;
        case "download":
          this.downloadDocument();
          break;
      }
    },
    downloadDocument() {
      DocumentService.downloadDocument(
        {
          ...this.attachment,
          extension: this.attachment?.extension
        },
        this
      );
    },
    previewDocument() {
      DocumentService.previewDocument(this.attachment, this);
    }
  }
};
</script>

<style>
</style>