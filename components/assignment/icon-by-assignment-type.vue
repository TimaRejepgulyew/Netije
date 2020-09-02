<template>
  <img :src="assignmentGroupIcon" alt />
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

<style>
</style>
