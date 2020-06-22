<template>
  <card-task />
</template>
<script>
import dataApi from "~/static/dataApi";
import cardTask from "~/components/task/index.vue";
export default {
  components: {
    cardTask
  },
  async asyncData({ app, params }) {
    await app.store.dispatch("currentTask/load", {
      taskType: +params.type,
      id: +params.id
    });
  }
};
</script>
