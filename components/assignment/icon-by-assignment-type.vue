<template>
  <img :src="iconByAssignmentType" />
</template>

<script>
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default {
  props: ["assignmentType"],
  computed: {
    iconByAssignmentType() {
      switch (this.assignmentType) {
        case AssignmentType.AcquaintanceAssignment:
        case AssignmentType.ReviewDraftResolutionAssignment:
       
          return require("~/static/icons/acquintanceTask.svg");
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
        case AssignmentType.PreparingDraftResolutionAssignment:
        case AssignmentType.ReviewDraftResolutionAssignment:
        case AssignmentType.ReviewManagerAssignment:
        case AssignmentType.ReviewResolutionAssignment:
          return require("~/static/icons/iconAssignment/clock.svg");
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return require("~/static/icons/status/underreview.svg");
        case AssignmentType.Notice:
        case AssignmentType.ActionItemExecutionNotification:
        case AssignmentType.AcquaintanceNotification:
        case AssignmentType.ActionItemObserversNotification:
        case AssignmentType.ActionItemSupervisorNotification:
        case AssignmentType.ReviewObserverNotification:
        case AssignmentType.ReviewObserversNotification:
        case AssignmentType.ReviewClerkNotification:
        case AssignmentType.ActionItemObserversNotification:
        case AssignmentType.ActionItemSupervisorNotification:
          return require("~/static/icons/iconAssignment/notice.svg");
        default:
          return require("~/static/icons/iconAssignment/InProccess1.svg");
      }
    }
  }
};
</script>

<style>
</style>