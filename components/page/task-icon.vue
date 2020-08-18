<template>
  <img class="icon--type" :src="icon" />
</template>

<script>
import TaskType from "~/infrastructure/constants/taskType.js";
import { taskElements } from "~/infrastructure/constants/taskType.js";
export default {
  props: ["taskTypeGuid"],
  computed: {
    icon() {
      return taskElements(this)[this.taskTypeGuid].icon;
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