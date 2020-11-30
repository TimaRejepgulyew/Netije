<template>
  <img class="image_viewer" v-if="url" :src="url" />
</template>

<script>
export default {
  props: {
    file: {
      default: false
    }
  },

  computed: {
    url() {
      if (this.file) return URL.createObjectURL(this.file);
    }
  }
};
</script>

<style lang="scss">
.image_viewer {
  max-width: 80vw;
}
</style>
