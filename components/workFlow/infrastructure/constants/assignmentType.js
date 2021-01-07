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
  FreeApprovalNotification: 21,
  ExchangeDocumentProcessingAssignment: 29,
  IntranetExchangeDocumentProcessingAssignment: 30,
  IntranetExchangeDocumentNotification: 31,
  IntranetExchangeDocumentTerminatedAssignment: 32
};
export default AssignmentType;
export function isAssignment(assignmenType) {
  const allowTypes = [
    AssignmentTypeGuid.AcquaintanceAssignment,
    AssignmentTypeGuid.ReviewDraftResolutionAssignment,
    AssignmentTypeGuid.SimpleAssignment,
    AssignmentTypeGuid.ActionItemExecutionAssignment,
    AssignmentTypeGuid.PreparingDraftResolutionAssignment,
    AssignmentTypeGuid.ReviewManagerAssignment,
    AssignmentTypeGuid.ReviewResolutionAssignment,
    AssignmentTypeGuid.FreeApprovalAssignment,
    AssignmentTypeGuid.FreeApprovalReworkAssignment
  ];
  return allowTypes.some(el => assignmenType === el);
}
export function isNotification(assignmenType) {
  const allowTypes = [
    AssignmentType.Notice,
    AssignmentType.ActionItemExecutionNotification,
    AssignmentType.AcquaintanceNotification,
    AssignmentType.ActionItemObserversNotification,
    AssignmentType.ActionItemSupervisorNotification,
    AssignmentType.ReviewObserverNotification,
    AssignmentType.ReviewObserversNotification,
    AssignmentType.ReviewClerkNotification,
    AssignmentType.FreeApprovalNotification
  ];
  return allowTypes.some(el => assignmenType === el);
}
export function isReviewAssignment(assignmenType) {
  const allowTypes = [
    AssignmentTypeGuid.AcquaintanceFinishAssignment,
    AssignmentTypeGuid.ActionItemSupervisorAssignment,
    AssignmentTypeGuid.ReviewAssignment,
    AssignmentTypeGuid.FreeApprovalFinishAssignment
  ];
  return allowTypes.some(el => assignmenType === el);
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
