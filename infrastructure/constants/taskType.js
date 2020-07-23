const TaskType = {
  SimpleTask: 0,
  AcquaintanceTask: 1,
  ActionItemExecutionTask: 2,
  DocumentReviewTask: 3
};
export default TaskType;
import * as taskTypeIcons from "~/static/icons/taskType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import entityTypes from "~/infrastructure/constants/entityTypes.js";
export function taskElements(context) {
  return generatorMapObj({
    Constant: TaskType,
    translateName: "task.type",
    context: context,
    iconStores: taskTypeIcons
  });
}
export const mapToEntityType = taskType => {
  switch (taskType) {
    case TaskType.SimpleTak:
      return entityTypes.SimpleTak;
    case TaskType.ActionItemExecutionTask:
      return entityTypes.ActionItemExecutionTask;
    case TaskType.AcquaintanceTask:
      return entityTypes.AcquaintanceTask;
    case TaskType.DocumentReviewTask:
      return entityTypes.DocumentReviewTask;
    default:
      throw "Unsupported task type";
  }
};
