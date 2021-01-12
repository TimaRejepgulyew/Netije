const TaskType = {
  SimpleTask: 0,
  AcquaintanceTask: 1,
  ActionItemExecutionTask: 2,
  DocumentReviewTask: 3,
  FreeApprovalTask: 5,
  ExchangeDocumentProcessingTask: 9,
  IntranetExchangeDocumentProcessingTask: 10
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
    case TaskType.ExchangeDocumentProcessingTask:
      return entityTypes.ExchangeDocumentProcessingTask;
    case TaskType.IntranetExchangeDocumentProcessingTask:
      return entityTypes.IntranetExchangeDocumentProcessingTask;

    default:
      throw "Unsupported task type";
  }
};
