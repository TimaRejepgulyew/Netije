<template>
  <main class="container">
    <h1>{{$t("translations.menu.region")}}</h1>
    <dataGrid />
  </main>
</template>
<script>
import dataGrid from "~/components/geeral-handbook/region__data-grid";
export default {
  middleware: "authorization",
  data() {
    return {};
  },
  components: {
    dataGrid
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
</style>