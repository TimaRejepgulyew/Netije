<template>
  <main class="container">
    <h1>{{$t("translations.menu.company-structure")}}</h1>
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
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
</style>