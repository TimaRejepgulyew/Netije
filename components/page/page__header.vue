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

.grid__title {
  font-weight: bold;
  font-size: 25px;
  margin: 1vh 0;
}
</style>
