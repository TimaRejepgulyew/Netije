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
import { confirm } from "devextreme/ui/dialog";
export default {
  components: {
    DxDropDownButton,
  },
  props: ["version", "documentId"],
  data() {
    return {
      btnType: [
        {
          type: "preview",
          visible: this.version.canBeOpenedWithPreview,
          icon: "pdffile",
          name: this.$t("buttons.preview"),
        },
        {
          type: "download",
          icon: "download",
          name: this.$t("buttons.download"),
        },
        {
          type: "delete",
          visible: this.$store.getters[
            `documents/${this.documentId}/fullAccess`
          ],
          icon: "trash",
          name: this.$t("buttons.delete"),
        },
      ],
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
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
          this.deleteVersion();
      }
    },
    previewVersion() {
      this.$popup.pdfFileReader(
        this,
        {
          id: this.version.id,
          lastVersion: false,
        },
        { showLoadingPanel: false }
      );
      // DocumentService.previewVersion(
      //   this.version.id,
      //   {
      //     id: this.documentId,
      //     documentTypeGuid: this.document.documentTypeGuid,
      //   },
      //   this
      // );
    },
    downloadVersion() {
      DocumentService.downloadVersion(
        {
          id: this.documentId,
          documentTypeGuid: this.document.documentTypeGuid,
        },
        {
          id: this.version.id,
          name: this.document.name,
          extension: this.version.extension,
        },
        this
      );
    },
    async deleteVersion() {
      const response = await confirm(
        this.$t("document.confirmMessage.sureDeleteVersion"),
        this.$t("shared.confirm")
      );
      if (!response) {
        return false;
      } else
        this.$awn.asyncBlock(
          this.$store.dispatch(
            `documents/${this.documentId}/removeVersion`,
            this.version.id
          ),
          () => {
            this.$store.dispatch(
              `documents/${this.documentId}/updateLastVersion`
            ),
              this.$emit("updateVersions");
          }
        );
    },
  },
};
</script>

<style lang="scss">
.attachment-btn {
  .dx-overlay {
    z-index: 9999;
  }
}
</style>
