<template>
  <img class="image_viewer" :src="url" />
</template>

<script>

      // this.$popup.imageViewer(this, {
      //   versionId: this.version.id,
      //   documentTypeGuid: this.document.documentTypeGuid,
      //   documentId: this.documentId,
      // });

export default {
  props: {
    file: {},
  },
  data() {
    return {
      url: null,
    };
  },
  mounted() {
    this.url = URL.createObjectURL(this.file);
  },
};
</script>

<style lang="scss">
.image_viewer {
  max-width: 80vw;
}
</style>

