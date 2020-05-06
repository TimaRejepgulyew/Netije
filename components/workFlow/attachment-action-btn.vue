<template>
  <DxDropDownButton
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
      this.attachment.document.hasVersions &&
      this.attachment.document.associatedApplication.canBeOpenedWithPreview;

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
          visible: this.attachment.document.hasVersions,
          icon: "download",
          name: this.$t("translations.links.download")
        },
        {
          type: "detach",
          visible: this.attachment.canDetach,
          icon: "trash",
          name: this.$t("translations.links.delete")
        }
      ]
    };
  },
  computed: {
    hasActions() {
      return (
        (this.attachment.document.hasVersions &&
          this.attachment.document.associatedApplication
            .canBeOpenedWithPreview) ||
        this.attachment.canDetach
      );
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
          this.detach();
          break;
      }
    },
    downloadDocument() {
      DocumentService.downloadDocument(
        {
          ...this.attachment.document,
          extension: this.attachment.document.associatedApplication.extension
        },
        this
      );
    },
    previewDocument() {
      DocumentService.previewDocument(this.attachment.document, this);
    },
    detach() {
      if (this.$route.params.id) {
        // this.$awn.async(
        //   this.$axios.post(dataApi.attachment.Detach, {
        //     attachmentId: this.attachment.id
        //   }),
        //   e => {
        //     this.$emit("reload");
        //     this.$awn.success();
        //   },
        //   e => {
        //     this.$emit("reload");
        //     this.$awn.alert();
        //   }
        // );
      } else {
        this.$emit("detach", this.attachment.document.id);
      }
    }
  }
};
</script>

<style>
</style>