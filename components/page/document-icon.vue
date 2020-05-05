<template>
  <i :class="'flaticon-'+ slicedExtension"></i>
</template>

<script>
export default {
  props: ["extension"],
  computed: {
    slicedExtension() {
      if (this.extension) {
        return this.extension.slice(1);
      }
    }
  }
};
</script>

<style>
</style>