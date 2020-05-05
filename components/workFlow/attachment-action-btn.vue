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
import { DxDropDownButton } from "devextreme-vue";
import { saveAs } from "file-saver";
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
      switch (e.itemData.type) {
        case "preview":
          this.openVersion();
          break;
        case "download":
          this.download;
      }
    },
    downloadVersion(version) {
      this.$axios
        .get(dataApi.paperWork.DownloadLastVersion + this.document.id, {
          responseType: "blob"
        })
        .then(response => {
          var blob = new Blob([response.data], {
            type: `data:${response.data.type}`
          });

          saveAs(blob, `${this.name}.${version.extension}`);
        });
    },
    openVersion(version) {
      this.$axios
        .get(dataApi.paperWork.PreviewLastVersion + this.document.id, {
          responseType: "blob"
        })
        .then(response => {
          var x = screen.width * 0.25;
          var offset = screen.height * 0.2;
          let params = `height=${screen.height - offset},width=${screen.width *
            0.5},left=${x},top=${50}`;
          window.open(URL.createObjectURL(response.data), "Preview", params);
        });
    },
    detachVersion() {
      // this.$axios.delete()
    }
  }
};
</script>

<style>
</style>