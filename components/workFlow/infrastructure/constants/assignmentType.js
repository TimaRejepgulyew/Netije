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
    AssignmentType.AcquaintanceAssignment,
    AssignmentType.ReviewDraftResolutionAssignment,
    AssignmentType.SimpleAssignment,
    AssignmentType.ActionItemExecutionAssignment,
    AssignmentType.PreparingDraftResolutionAssignment,
    AssignmentType.ReviewManagerAssignment,
    AssignmentType.ReviewResolutionAssignment,
    AssignmentType.FreeApprovalAssignment,
    AssignmentType.FreeApprovalReworkAssignment,
    AssignmentType.IntranetExchangeDocumentProcessingAssignment,
    AssignmentType.IntranetExchangeDocumentTerminatedAssignment
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
    AssignmentType.FreeApprovalNotification,
    AssignmentType.IntranetExchangeDocumentNotification
  ];
  return allowTypes.some(el => assignmenType === el);
}
export function isReviewAssignment(assignmenType) {
  const allowTypes = [
    AssignmentType.AcquaintanceFinishAssignment,
    AssignmentType.ActionItemSupervisorAssignment,
    AssignmentType.ReviewAssignment,
    AssignmentType.FreeApprovalFinishAssignment
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
