<template>
  <div>
    <My-exchange-integration
      @create="createBox"
      @selected="toDetail"
      :isCard="false"
    />
  </div>
</template>

<script>
import MyExchangeIntegration from "~/components/integration-exchage/grids/my-exchage-integrations.vue";
export default {
  components: {
    MyExchangeIntegration,
  },
  methods: {
    createBox() {
      this.$router.push("integration-exchange/create");
    },
    toDetail({ id }) {
      console.log(id);
      this.$router.push("integration-exchange/" + id);
    },
  },
};
</script>

<style>
</style>