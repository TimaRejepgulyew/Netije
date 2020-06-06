<template>
  <employee-card :employeeId="+$route.params.id" />
</template>

<script>
import employeeCard from "~/components/employee/employee-card.vue";
export default {
  components: {
    employeeCard
  }
};
</script>

