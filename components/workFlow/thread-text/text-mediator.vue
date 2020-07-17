<template>
  <component
    @toDetailAuthor="(id)=>toDetail('toDetailAuthor',id)"
    @toDetailTask="(params)=>toDetail('toDetailTask',params)"
    @toDetailAssignment="(params)=>toDetail('toDetailAssignment',params)"
    :comment="comment"
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
  props: ["comment"],
  created() {
  },
  computed: {
    getComponentByType() {
      switch (this.comment.type) {
        case WorkflowEntityTextType.Task:
          return "task-tread-text";
        case WorkflowEntityTextType.Notice:
          return "notification-tread-text";
        case WorkflowEntityTextType.Assignment:
          return "assignment-tread-text";
      }
    }
  },
  methods: {
    toDetail(emitName, params) {
      this.$emit(emitName, params);
    }
  }
};
</script>

<style>
</style>