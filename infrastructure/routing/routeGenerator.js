import TaskType from "../constants/taskType";
import AssignmentType from "../constants/assignmentType";
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
  generateAssignmentDetailRoute(assignmentType, assignmentId) {
    console.log(assignmentType);
    switch (assignmentType) {
      case AssignmentType.SimpleAssignment:
        return `/assignment/simple/assignment/${assignmentId}`;
      case AssignmentType.AcquaintanceAssignment:
        return `/assignment/acquaintance/assignment/${assignmentId}`;
      case AssignmentType.ActionItemExecutionAssignment:
        return `/assignment/action-item-execution/assignment/${assignmentId}`;
      case AssignmentType.SimpleNotify:
        return `/assignment/simple/notify/${assignmentId}`;
      case AssignmentType.AcquaintanceNotify:
        return `/assignment/acquaintance/notify/${assignmentId}`;
      case AssignmentType.ActionItemExecutionNotify:
        return `/assignment/action-item-execution/notify/${assignmentId}`;
      default:
        throw "unknown task type";
    }
  },
  generateDocumentDetailRoute(context, documentId) {
    return `${context.$route.path}/form/${documentId}`;
  }
};
