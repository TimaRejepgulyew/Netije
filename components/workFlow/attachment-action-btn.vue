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
      this.attachment.entity.hasVersions &&
      this.attachment.entity.canBeOpenedWithPreview;

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
          visible: this.attachment.entity.hasVersions,
          icon: "download",
          name: this.$t("buttons.download")
        },
        {
          type: "detach",
          visible: this.attachment.canDetach,
          icon: "trash",
          name: this.$t("buttons.deleteLink")
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
        case "detach":
          this.detachLink();
      }
    },
    detachLink() {
      const { entity = { id, documentTypeGuid } } = this.attachmenty;
      this.$emit("detachLink", { attachmentId: id });
    },
    downloadDocument() {
      DocumentService.downloadDocument(
        {
          ...this.attachment.entity,
          extension: this.attachment.entity.extension
        },
        this
      );
    },
    previewDocument() {
      DocumentService.previewDocument(this.attachment.entity, this);
    }
  }
};
</script>

<style>
</style>