<template>
  <employee-card :data="currentEmployee" />
</template>

<script>
import dataApi from "~/static/dataApi";
import employeeCard from "~/components/employee/employee-card.vue";

export default {
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `${dataApi.company.Employee}/${+params.id}`
    );
    return {
      currentEmployee: data
    };
  },
  data() {
    return {
      currentEmployee: null
    };
  },
  components: {
    employeeCard
  }
};
</script>
