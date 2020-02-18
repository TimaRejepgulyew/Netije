<template>
  <main class="container">
    <h1>{{$t("translations.menu.countries")}}</h1>
    <data-grid />
  </main>
</template>
<script>
import dataGrid from "~/components/geeral-handbook/countries__data-grid";
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
@import "~assets/dx-styles.scss";
.container {
  display: block;
}

</style>