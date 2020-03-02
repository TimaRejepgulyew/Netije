<template>
  <header class="grid__header">
    <h3 class="grid__title">{{headerTitle}}</h3>
  </header>
</template>
<script>
export default {
  props: ["headerTitle"]
};
</script>

<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
.grid__header {
  background: #f0f3f5;
}
.grid__title {
  font-size: 30px;
  font-weight: normal;
  padding: 30px 20px;
}
</style>
