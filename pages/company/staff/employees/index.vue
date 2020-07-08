<template>
  <employee-list :isCard="false" />
</template>

<script>
import employeeList from "~/components/employee/employee-list.vue";
export default {
  components: {
    employeeList
  }
};
</script>

