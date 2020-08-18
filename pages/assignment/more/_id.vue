<template>
  <assignment-card :assignmentId="+$route.params.id" :isCard="false" />
</template>

<script>
import { load } from "~/infrastructure/services/assignmentService.js";
import assignmentCard from "~/components/assignment/index.vue";

export default {
  components: {
    assignmentCard
  },
  async asyncData(context) {
    await load({ $store: context.store }, context.params.id);
  }
};
</script>

<style>
</style>