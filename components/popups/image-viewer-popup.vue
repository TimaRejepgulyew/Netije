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
    imageViewer
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      file: null
    };
  },
  methods: {},
  async created() {
    if (this.options.handler && this.options.params)
      this.file = await this.options.handler(this, this.options.params);
    console.log(this.file, this.options.params);
    this.$emit("showTitle", this.$t("document.headers.imageEditor"));
    this.$emit("loadStatus");
  }
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
