<template>
  <i :class="slicedExtension"></i>
</template>

<script>
export default {
  props: ["extension"],
  computed: {
    slicedExtension() {
      if (this.extension) {
        return "flaticon-" + this.extension.slice(1);
      } else {
        return "dx-icon-file";
      }
    }
  }
};
</script>

<style scoped>
.dx-icon-file {
  font-size: 30px;
  font-style: normal;
  margin: 0 7.5px;
}
</style>