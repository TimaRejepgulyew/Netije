const AssignmentType = {
  SimpleAssignment: 0,
  AcquaintanceAssignment: 1,
  ActionItemExecutionAssignment: 2,
  SimpleNotify: 3,
  ActionItemExecutionNotification: 4,
  AcquaintanceNotification: 5,
  AcquaintanceFinishAssignment: 6,
  ActionItemSupervisorAssignment: 7,
  ReviewAssignment: 8,
  ActionItemObserversNotification: 16,
  ActionItemSupervisorNotification: 17
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
