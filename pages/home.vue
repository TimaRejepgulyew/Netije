<template>
  <main class="container">

    <DxDataGrid :data-source="dataSource" :columns="columns" :show-borders="true" />
  </main>
</template>
<script>
import DxDataGrid from "devextreme-vue/data-grid";
import { customers } from "../static/data";
import oidc from "~/plugins/oidc-plugin";

export default {
  middleware: "authorization",
  data() {
    return {
      dataSource: customers,
      columns: ["CompanyName", "City", "State", "Phone", "Fax"]
    };
  },
  components: {
    DxDataGrid
  },
  methods: {
    
  },
  computed: {
  }
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