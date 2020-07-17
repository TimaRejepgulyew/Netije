<template>
  <assignment-card :assignmentId="+$route.params.id" :isCard="false" />
</template>

<script>
import { loadAssignment } from "~/infrastructure/services/load.js";
import assignmentCard from "~/components/assignment/index.vue";
export default {
  components: {
    assignmentCard
  },
  async asyncData(context) {
    console.log(context.store);
    await loadAssignment({ $store: context.store }, context.params.id);
    await context.store.dispatch("currentAssignment/load", {
      key: context.params.id
    });
  }
};
</script>

<style>
</style>