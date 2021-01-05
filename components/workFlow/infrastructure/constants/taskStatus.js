const TaskStatus = {
  InProcess: 0,
  Draft: 1,
  Suspended: 2,
  Completed: 3,
  Aborted: 4,
  UnderReview: 5
};
export default TaskStatus;
import statusIcon from "~/static/icons/status/taskStatus.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export function taskStatusGeneratorObj(context) {
  return generatorMapObj({
    Constant: TaskStatus,
    translateName: "task.status",
    context: context,
    iconStores: statusIcon
  });
}
