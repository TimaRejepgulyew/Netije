<template>
  <div>
    <ExchangeOptionForm @close="close" v-if="data" :data="data" />
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import ExchangeOptionForm from "~/components/integration-exchage/forms/counter-part-exchange-options.vue";
export default {
  components: {
    ExchangeOptionForm
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  async created() {
    const { data } = await this.$axios.get(
      `${dataApi.exchange.GetExchangeInfoByCounterPartId}/${this.options.counterPartId}`
    );
    this.data = data;
    this.$emit("showTitle", this.$t("exchange.exchangeOptions"));
    this.$emit("loadStatus");
  }
};
</script>

