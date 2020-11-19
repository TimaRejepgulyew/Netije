<template>
  <employee-card v-if="data" :data="data" :isCard="true" />
</template>

<script>
import dataApi from "~/static/dataApi";
import employeeCard from "~/components/employee/employee-card.vue";
export default {
  components: {
    employeeCard,
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
      `${dataApi.company.Employee}/${this.options.employeeId}`
    );
    this.data = data;
    this.$emit("loadStatus");
    this.$emit("showTitle", data.name);
  },
};
</script>

<style>
</style>