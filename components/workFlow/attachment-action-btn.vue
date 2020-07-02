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
import cardIcon from "~/static/icons/card.svg";
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
        },
        {
          type: "card",
          icon: cardIcon,
          name: this.$t("buttons.showCard")
        }
      ]
    };
  },
  computed: {},
  methods: {
    showCard() {
      this.$emit("showCard");
    },
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
          break;
        case "card":
          this.showCard();
          break;
      }
    },
    detachLink() {
      console.log(this.attachment.attachmentId);
      this.$emit("detach", this.attachment.attachmentId);
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