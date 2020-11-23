<template>
  <component
    :data="data"
    :is="getComponentByType"
  />
</template>

<script>
import taskTreadText from "~/components/workFlow/thread-text/task-item.vue";
import assignmentTreadText from "~/components/workFlow/thread-text/assignment-item.vue";
import notificationTreadText from "~/components/workFlow/thread-text/notification-item.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
export default {
  components: {
    taskTreadText,
    assignmentTreadText,
    notificationTreadText
  },
  name: "text-mediator",
  props: ["data","type"],
  created() {
  },
  computed: {
    getComponentByType() {
      switch (this.type) {
        case WorkflowEntityTextType.Task:
          return "task-tread-text";
        case WorkflowEntityTextType.Notice:
          return "notification-tread-text";
        case WorkflowEntityTextType.Assignment:
          return "assignment-tread-text";
      }
    }
  },
};
</script>

<style>
</style>