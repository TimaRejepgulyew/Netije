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
  FreeApprovalAssignment: 16,
  FreeApprovalFinishAssignment: 17,
  FreeApprovalReworkAssignment: 18,
  ActionItemObserversNotification: 19,
  ActionItemSupervisorNotification: 20,
  FreeApprovalNotification: 21
};
export default AssignmentType;


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
