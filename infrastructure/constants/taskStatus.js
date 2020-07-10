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
export function taskStatusLocalization(context) {
  let obj = {};
  for (let status in TaskStatus) {
    obj[TaskStatus[status]] = {
      icon: statusIcon[status],
      text: context.$t(`task.status.${status}`)
    };
  }
  return obj;
}
