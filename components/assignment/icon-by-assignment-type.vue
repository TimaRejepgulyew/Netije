<template>
  <img :src="iconByAssignmentType" />
</template>

<script>
// import AssignmentType from "~/infrastructure/models/AssignmentType.js";

export default {
  props: ["assignmentType"],
  data() {
    // assignmenType: new AssignmentType();
  },
  computed: {
    iconByAssignmentType() {
      // assignmenType.getById()
      // switch (this.assignmentType) {
      //   case AssignmentType.AcquaintanceAssignment:
      //     return require("~/static/icons/acquintanceTask.svg");
      //   case AssignmentType.ReviewDraftResolutionAssignment:
      //   case AssignmentType.SimpleAssignment:
      //   case AssignmentType.ActionItemExecutionAssignment:
      //   case AssignmentType.PreparingDraftResolutionAssignment:
      //   case AssignmentType.ReviewManagerAssignment:
      //   case AssignmentType.ReviewResolutionAssignment:
      //   case AssignmentType.FreeApprovalAssignment:
      //   case AssignmentType.FreeApprovalReworkAssignment:
      //     return require("~/static/icons/iconAssignment/clock.svg");
      //   case AssignmentType.AcquaintanceFinishAssignment:
      //   case AssignmentType.ActionItemSupervisorAssignment:
      //   case AssignmentType.ReviewAssignment:
      //   case AssignmentType.FreeApprovalFinishAssignment:
      //     return require("~/static/icons/status/underreview.svg");
      //   case AssignmentType.Notice:
      //   case AssignmentType.ActionItemExecutionNotification:
      //   case AssignmentType.AcquaintanceNotification:
      //   case AssignmentType.ActionItemObserversNotification:
      //   case AssignmentType.ActionItemSupervisorNotification:
      //   case AssignmentType.ReviewObserverNotification:
      //   case AssignmentType.ReviewObserversNotification:
      //   case AssignmentType.ReviewClerkNotification:
      //   case AssignmentType.FreeApprovalNotification:
      //     return require("~/static/icons/iconAssignment/notice.svg");
      //   default:
      //     return require("~/static/icons/iconAssignment/InProccess1.svg");
      // }
    },
  },
};
</script>

<style>
</style>
