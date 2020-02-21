<template>
  <main class="container"></main>
</template>
<script>
import oidc from "~/plugins/oidc-plugin";

export default {
  data() {
    return {
      columns: ["CompanyName", "City", "State", "Phone", "Fax"]
    };
  },
  components: {},
  methods: {},
  computed: {}
};
</script>
<style scoped>
.container {
  display: block;
}
h1 {
  text-align: left;
}
</style>