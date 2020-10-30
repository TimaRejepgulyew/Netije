<template>
  <div class="attachment-btn">
    <DxDropDownButton
      styling-mode="text"
      icon="overflow"
      :showArrowIcon="false"
      :drop-down-options="{ width: 230 }"
      :items="btnType"
      display-expr="name"
      @item-click="onItemClick"
    />
  </div>
</template>

<script>
import DocumentService from "~/infrastructure/services/documentVersionService";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDropDownButton
  },
  props: ["version", "documentId"],
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
        },
        {
          type: "delete",
          icon: "trash",
          name: this.$t("buttons.delete")
        }
      ]
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    }
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
        case "delete":
          this.deleteVarsion();
      }
    },
    previewVersion() {
      DocumentService.previewVersion(
        this.version.id,
        {
          id: this.documentId,
          documentTypeGuid: this.document.documentTypeGuid
        },
        this
      );
    },
    downloadVersion() {
      DocumentService.downloadVersion(
        {
          id: this.documentId,
          documentTypeGuid: this.document.documentTypeGuid
        },
        {
          id: this.version.id,
          name: this.document.name,
          extension: this.version.extension
        },
        this
      );
    },
    async deleteVersion() {
      await this.$axios.delete(
        dataApi.documentModule.RemoveVersion + this.version.id
      );
      const res = await this.$axios.get(
        dataApi.documentModule.Last + this.documentId
      );
      console.log(res);
      this.$store.dispatch("updateLastVersion", res);
      this.$emit("updateVersions");
    }
  }
};
</script>

<style lang="scss">
.attachment-btn {
  .dx-overlay {
    z-index: 9999;
  }
}
</style>
