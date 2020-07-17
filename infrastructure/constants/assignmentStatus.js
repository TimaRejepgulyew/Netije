import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
const AssignmentStatus = {
  InProcess: 0,
  Suspended: 1,
  Completed: 2,
  Aborted: 3
};

export default AssignmentStatus;
import statusIcon from "~/static/icons/status/assignmentStatus.js";
export function assignmentStatusLocalization(context) {
  return generatorMapObj({
    Constant: AssignmentStatus,
    translateName: "assignment.status",
    context: context,
    iconStores: statusIcon
  });
}
