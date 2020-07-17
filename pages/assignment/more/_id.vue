<template>
  <assignment-card :assignmentId="+$route.params.id" :isCard="false" />
</template>

<script>
import assignmentCard from "~/components/assignment/index.vue";
export default {
  components: {
    assignmentCard
  },
  async asyncData({ app, params }) {
    await app.store.dispatch("currentAssignment/load", { key: params.id });
  }
};
</script>

<style>
</style>