<template>
  <div class="d-flex rotate-0">
    <img
      :class="{ ['rotate-' + data.rotate]: data.rotate }"
      class="current-page"
      :src="data.file"
    />
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.getters["scanner/currentPage"];
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.current-page {
  justify-self: center;
  display: block;
  width: 450px;
  align-self: center;
  max-height: 650px;
}
.rotate-0 {
  transform: rotateZ(0);
}

.rotate-270 {
  transform: rotateZ(270deg);
}
.rotate-90 {
  transform: rotateZ(90deg);
}
.rotate-180 {
  transform: rotateZ(180deg);
}
</style>