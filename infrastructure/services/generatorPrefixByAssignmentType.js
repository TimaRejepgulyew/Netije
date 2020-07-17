import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default function(type, context) {
  switch (type) {
    case AssignmentType.ActionItemSupervisorAssignment:
      return context.$t("assignment.prefixes.actionItemSupervisorAssignment");

    case AssignmentType.ActionItemExecutionAssignment:
      return context.$t("assignment.prefixes.actionItemExecutionAssignment");

    case AssignmentType.ActionItemExecutionNotification:
      return context.$t("assignment.prefixes.actionItemExecutionNotification");

    case AssignmentType.AcquaintanceAssignment:
      return context.$t("assignment.prefixes.acquaintanceAssignment");

    case AssignmentType.AcquaintanceNotification:
      return context.$t("assignment.prefixes.acquaintanceNotification");

    case AssignmentType.AcquaintanceFinishAssignment:
      return context.$t("assignment.prefixes.acquaintanceFinishAssignment");

    case AssignmentType.ActionItemObserversNotification:
      return context.$t("assignment.prefixes.actionItemObserversNotification");

    default:
      return "";
  }
}
