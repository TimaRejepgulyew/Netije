<template>
  <div>
    <approve-list :assignmentId="assignmentId" />
  </div>
</template>

<script>
import approversList from "~/components/assignment/form-components/approvers-list.vue";
export default {
  components: {
    approversList
  },
  props: ["assignmentId"]
};
</script>

<style></style>
