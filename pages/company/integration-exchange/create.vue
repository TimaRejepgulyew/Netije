<template>
  <My-exchange-integration :isCard="false" :data="data" />
</template>

<script>
import MyExchangeIntegration from "~/components/integration-exchage/forms/my-exchange-integration.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    MyExchangeIntegration,
  },

  data() {
    return {
      data: null,
    };
  },
};
</script>

<style>
</style>