<template>
  <card-task @onClose="closeTask" :taskId="taskId" />
</template>
<script>
import taskChangeTracker from "~/components/workFlow/task-module/infrastructure/services/taskChangeTracker.js";
import dataApi from "~/static/dataApi";
import cardTask from "~/components/workFlow/task-module/main-form.vue";
import { load } from "~/components/workFlow/infrastructure/services/taskService.js";
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
  async beforeRouteLeave(to, from, next) {
    let result = true;
    if (!this.$store.getters[`tasks/${+this.taskId}/skipRouteHandling`]) {
    }
    result = await taskChangeTracker.handleConfirm(this, this.taskId);
    next(result);
  },
  async beforeRouteUpdate(to, from, next) {
    let result = true;
    if (!this.$store.getters[`tasks/${this.taskId}/skipRouteHandling`]) {
      result = await taskChangeTracker.handleConfirm(this, this.taskId);
      if (result) {
        await load(this, {
          taskType: +this.$route.params.type,
          taskId: +this.taskId,
        });
      }
    }
    next(result);
  },
  methods: {
    closeTask() {
      this.$router.push(`/task`);
    },
  },
};
</script>
