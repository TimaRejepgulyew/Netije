<template>
  <card-task :taskId="taskId" />
</template>
<script>
import dataApi from "~/static/dataApi";
import cardTask from "~/components/task/index.vue";
import { load, taskModules } from "~/infrastructure/services/taskService.js";
export default {
  components: {
    cardTask,
  },
  async asyncData({ app, params, $axios, store }) {
    await load(
      { $store: app.store, $axios },
      { taskType: +params.type, taskId: +params.id }
    );

    return {
      taskId: +params.id,
    };
  },
};
</script>
