<template>
  <img class="icon--type" :src="path" />
</template>

<script>
import TaskType from "~/infrastructure/constants/taskType.js";
export default {
  props: ["taskTypeGuid"],
  computed: {
    path() {
      switch (this.taskTypeGuid) {
        case TaskType.AcquaintanceTask:
          return require("~/static/icons/acquintanceTask.svg");
        case TaskType.SimpleTask:
          return require("~/static/icons/status/simple.svg");
        case TaskType.ActionItemExecutionTask:
          return require("~/static/icons/actionItemExecution.svg");
        default:
          return require("~/static/icons/iconAssignment/InProccess1.svg");
      }
    }
  }
};
</script>

<style>
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>