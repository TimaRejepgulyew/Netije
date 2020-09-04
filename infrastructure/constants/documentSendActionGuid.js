
import TaskType from "~/infrastructure/constants/taskType.js"
const DocumentSendActionGuid = {
  DefaultAction: 0,
  ActionItemExecution: 1,
  Acquaintance: 2,
  ReviewManager: 3,
  FreeApproval: 4,
  Approval: 5,
}
export default DocumentSendActionGuid

export function mapToTaskType(documentSendActionType) {
  console.log(documentSendActionType)
  switch (documentSendActionType) {
    case DocumentSendActionGuid.DefaultAction:
      return TaskType.SimpleTask
    case DocumentSendActionGuid.ActionItemExecution:
      return TaskType.ActionItemExecutionTask
    case DocumentSendActionGuid.Acquaintance:
      return TaskType.AcquaintanceTask
    case DocumentSendActionGuid.ReviewManager:
      return TaskType.DocumentReviewTask
    default:
      // return "Unsupported DocumentSendActionGuid type " + documentSendActionType;
  }
}
