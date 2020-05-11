import TaskType from "../constants/taskType";
export default {
  generateTaskDetailRoute(taskType, taskId) {
    switch (taskType) {
      case TaskType.SimpleTask:
        return `/task/simple/${taskId}`;
      case TaskType.AcquaintanceTask:
        return `/task/acquaintance/${taskId}`;
      case TaskType.ActionItemExecutionTask:
        return `/task/action-item-execution/${taskId}`;
      default:
        throw "unknown task type";
    }
  },
  generateDocumentDetailRoute(context, documentId) {
    return `${context.$route.path}/form/${documentId}`;
  }
};
