import TaskType from "~/components/workFlow/infrastructure/constants/taskType.js";
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
 
};
