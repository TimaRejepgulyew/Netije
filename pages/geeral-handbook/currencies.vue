<template>
  <main class="container">
    <h1>{{$t("translations.menu.currencies")}}</h1>
    <dataGrid></dataGrid>
  </main>
</template>
<script>
import dataGrid from "~/components/geeral-handbook/currencies__data-grid";
export default {
  middleware: "authorization",
  data() {
    return {};
  },
  components: {dataGrid},
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";

.container {
  display: block;
}
</style>