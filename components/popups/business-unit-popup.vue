<template>
  <business-unit-card v-if="data" :isCard="true" :data="data" />
</template>

<script>
import dataApi from "~/static/dataApi";
import businessUnitCard from "~/components/company/organization-structure/business-unit/card.vue";
export default {
  components: {
    businessUnitCard,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      data: null,
    };
  },
  async created() {
    const { data } = await this.$axios.get(
      `${dataApi.company.BusinessUnit}/${this.options.businessUnitId}`
    );
    this.data = data;
    this.$emit("loadStatus");
    this.$emit("showTitle", data.name);
  },
};
</script>

<style>
</style>