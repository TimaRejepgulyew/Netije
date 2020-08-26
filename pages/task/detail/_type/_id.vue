<template>
  <card-task @onClose="closeTask" :taskId="taskId" />
</template>
<script>
import taskChangeTracker from "~/infrastructure/services/taskChangeTracker.js";
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
  async beforeRouteLeave(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[`tasks/${this.$route.params.id}/skipRouteHandling`]
    ) {
      result = await taskChangeTracker.handleConfirm(
        this,
        this.$route.params.id
      );

      next(result);
    }
  },
  async beforeRouteUpdate(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[`tasks/${this.$route.params.id}/skipRouteHandling`]
    ) {
      result = await taskChangeTracker.handleConfirm(
        this,
        this.$route.params.id
      );
      if (result) {
        await load(this, {
          taskType: +this.$route.params.type,
          taskId: +this.$route.params.id,
        });
      }

      next(result);
    }
  },
  methods: {
    closeTask() {
      this.$router.push(`/task`);
    },
  },
};
</script>
