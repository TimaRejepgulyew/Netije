import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
const AssignmentType = {
  SimpleAssignment: 0,
  AcquaintanceAssignment: 1,
  ActionItemExecutionAssignment: 2,
  Notice: 3,
  ActionItemExecutionNotification: 4,
  AcquaintanceNotification: 5,
  AcquaintanceFinishAssignment: 6,
  ActionItemSupervisorAssignment: 7,
  ReviewAssignment: 8,
  PreparingDraftResolutionAssignment: 9,
  ReviewDraftResolutionAssignment: 10,
  ReviewManagerAssignment: 11,
  ReviewResolutionAssignment: 12,
  ReviewObserverNotification: 13,
  ReviewObserversNotification: 14,
  ReviewClerkNotification: 15,
  ActionItemObserversNotification: 16,
  ActionItemSupervisorNotification: 17,

};
export default AssignmentType;
export function isAssignment(type) {
  switch (type) {
    case AssignmentType.SimpleAssignment:
    case AssignmentType.AcquaintanceAssignment:
    case AssignmentType.ActionItemExecutionAssignment:
    case AssignmentType.AcquaintanceFinishAssignment:
    case AssignmentType.ActionItemSupervisorAssignment:
    case AssignmentType.ReviewAssignment:
      return true;
    default:
      return false;
  }
}

export function isActionItemExicutionAssignment(type) {
  return type === AssignmentType.ActionItemExecutionAssignment;
}
export function assignmentTypeName(context) {
  return generatorMapObj({
    Constant: AssignmentType,
    translateName: "assignment.type",
    context: context
  });
}
