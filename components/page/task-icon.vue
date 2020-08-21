<template>
  <img class="icon--type" :src="icon" />
</template>

<script>
import TaskType from "~/infrastructure/models/TaskType.js";
export default {
  props: ["taskTypeGuid"],
  computed: {
    icon() {
      
      const icon = new TaskType(this).getById(this.taskTypeGuid).icon;
      return icon;
    },
  },
};
</script>

<style>
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>