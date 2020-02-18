<template>
  <main class="container">
    <h1>{{$t("translations.menu.currencies")}}</h1>
  </main>
</template>
<script>
export default {
  middleware: "authorization",
  data() {
    return {};
  },
  components: {},
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