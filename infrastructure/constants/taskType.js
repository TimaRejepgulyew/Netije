const TaskType = {
  SimpleTask: 0,
  AcquaintanceTask: 1,
  ActionItemExecutionTask: 2,
  DocumentReviewTask: 3,
  FreeApprovalTask: 5
};
export default TaskType;
import entityTypes from "~/infrastructure/constants/entityTypes.js";

export const mapToEntityType = taskType => {
  switch (taskType) {
    case TaskType.SimpleTask:
      return entityTypes.SimpleTask;
    case TaskType.ActionItemExecutionTask:
      return entityTypes.ActionItemExecutionTask;
    case TaskType.AcquaintanceTask:
      return entityTypes.AcquaintanceTask;
    case TaskType.DocumentReviewTask:
      return entityTypes.DocumentReviewTask;
    case TaskType.FreeApprovalTask:
      return entityTypes.FreeApprovalTask;
    default:
      throw "Unsupported task type";
  }
};
