const TaskType = {
  SimpleTask: 0,
  AcquaintanceTask: 1,
  ActionItemExecutionTask: 2,
  DocumentReviewTask: 3
};
export default TaskType;
import * as taskTypeIcons from "~/static/icons/taskType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";

export function taskElements(context) {
  return generatorMapObj({
    Constant: TaskType,
    translateName: "task.type",
    context: context,
    iconStores: taskTypeIcons
  });
}
