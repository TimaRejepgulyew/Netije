const AssignmentType = {
  SimpleAssignment: 0,
  AcquintanceAssignment: 1,
  ActionItemExecutionAssignment: 2,
  SimpleNotify: 3,
  ActionItemExecutionNotify: 4,
  AcquintanceNotify: 5,
  AcquaintanceFinishAssignment: 6,
  ActionItemSupervisorAssignment: 7,
  ReviewAssignment: 8
};
export default AssignmentType;
export function isAssignment(type) {
  switch (type) {
    case AssignmentType.SimpleAssignment:
    case AssignmentType.AcquintanceAssignment:
    case AssignmentType.ActionItemExecutionAssignment:
    case AssignmentType.AcquaintanceFinishAssignment:
    case AssignmentType.ActionItemSupervisorAssignment:
    case AssignmentType.ReviewAssignment:
      return true;
    default:
      return false;
  }
}
