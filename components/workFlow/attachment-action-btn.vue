<template>
  <DxDropDownButton
    :drop-down-options="{ width: 230 }"
    :items="btnType"
    display-expr="name"
    text="..."
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
  props: ["document", "canDetach"],
  data() {
    const canPreview = this.document.canPreview && this.canDetach;
    return {
      btnType: [
        {
          type: "preview",
          visible: canPreview,
          icon: "search",
          name: this.$t("translations.links.preview")
        },
        {
          type: "download",
          visible: this.document.hasVersion,
          icon: "download",
          name: this.$t("translations.links.download")
        },
        {
          type: "detach",
          // visible: this.canDetach,
          icon: "trash",
          name: this.$t("translations.links.delete")
        }
      ]
    };
  },
  methods: {
    onItemClick(e) {
      console.log(e);
      switch (e.itemData.type) {
        case "preview":
          this.previewDocument();
          break;
        case "download":
          this.downloadDocument();
      }
    },
    downloadDocument() {
      DocumentService.downloadDocument(
        {
          ...this.document,
          extension: this.document.associatedApplication.extension
        },
        this
      );
    },
    previewDocument() {
      DocumentService.previewDocument(this.document, this);
    },
    detachVersion() {
      // this.$axios.delete()
    }
  }
};
</script>

<style>
</style>