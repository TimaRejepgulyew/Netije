<template>
  <div class="image_viewer_wrapper">
    <image-viewer v-if="file" :file="file" />
  </div>
</template>

<script>
import imageViewer from "~/components/file-readers/image-viewer/index.vue";
import DocumentService from "~/infrastructure/services/documentVersionService";
export default {
  components: {
    imageViewer,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {},
  async created() {
    let file = await DocumentService.previewVersion(
      this.options.versionId,
      {
        id: this.options.documentId,
        documentTypeGuid: this.options.documentTypeGuid,
      },
      this
    );
    this.file = file;
    this.$emit("loadStatus");
  },
};
</script>

<style lang="scss">
.image_viewer_wrapper {
  min-width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>