<template>
  <card-task :taskId="taskId" />
</template>
<script>
import dataApi from "~/static/dataApi";
import cardTask from "~/components/task/index.vue";
import { load } from "~/infrastructure/services/taskService.js";
export default {
  components: {
    cardTask
  },
  async asyncData({ app, params }) {
    await load(
      { $store: app.store, $axios },
      { taskType: +params.type, taskId: +params.id }
    );
    await app.store.dispatch("currentTask/load", {
      taskType: +params.type,
      key: +params.id
    });
    return {
      taskId: +params.id
    };
  }
};
</script>
