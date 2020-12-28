<template>
  <img class="assignment-icon" :src="assignmentGroupIcon" alt />
</template>

<script>
import AssignmentType from "~/infrastructure/models/AssignmentType.js";

export default {
  props: ["assignmentType", "assignmentTypes"],

  computed: {
    assignmentGroupIcon() {
      return this.assignmentTypes.getById(this.assignmentType).icon;
    },
  },
};
</script>

<style scoped>
.assignment-icon{
  min-width: 25px;
  height: 20px;
}
</style>
