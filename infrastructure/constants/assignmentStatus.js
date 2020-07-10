const AssignmentStatus = {
  InProccess: 0,
  Suspended: 1,
  Completed: 2,
  Aborted: 3
};

export default AssignmentStatus;

import statusIcon from "~/static/icons/status/taskStatus.js";
export function taskStatusLocalization(context) {
  let obj = {};
  for (let status in AssignmentStatus) {
    obj[TaskStatus[status]] = {
      icon: statusIcon[status],
      text: context.$t(`task.status.${status}`)
    };
  }
  return obj;
}
