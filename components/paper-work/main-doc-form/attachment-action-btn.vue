<template>
  <DxDropDownButton
    styling-mode="text"
    icon="overflow"
    :showArrowIcon="false"
    :drop-down-options="{ width: 230 }"
    :items="btnType"
    display-expr="name"
    @item-click="onItemClick"
  />
</template>

<script>
import DocumentService from "~/infrastructure/services/documentService";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  props: ["version"],
  data() {
    return {
      btnType: [
        {
          type: "preview",
          visible: this.version.canBeOpenedWithPreview,
          icon: "pdffile",
          name: this.$t("buttons.preview")
        },
        {
          type: "download",
          icon: "download",
          name: this.$t("buttons.download")
        }
      ]
    };
  },
  methods: {
    onItemClick(e) {
      switch (e.itemData.type) {
        case "preview":
          this.previewVersion();
          break;
        case "download":
          this.downloadVersion();
          break;
      }
    },
    previewVersion() {
      DocumentService.previewVersion(this.version, this);
    },
    downloadVersion() {
      DocumentService.downloadVersion(
        {
          document: {
            id: this.$store.getters["currentDocument/document"].id,
            documentTypeGuid: this.$store.getters["currentDocument/document"]
              .documentTypeGuid
          },
          name: this.$store.getters["currentDocument/document"].name,
          extension: this.version.extension
        },
        this
      );
    }
  }
};
</script>

<style>
</style>