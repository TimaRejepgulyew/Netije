import { AcquaintanceFormAssignment } from "../acquaintance/AssignmentFormComponent.js";
import AssignmentType from "../../infrastructure/constants/assignmentType";
import assignment from "./assignment/index.vue";
import supervisor from "./supervisor/index.vue";
const actionItemExicutionAssignmentForms = {
  [AssignmentType.ActionItemExecutionAssignment]: assignment,
  [AssignmentType.ActionItemSupervisorAssignment]: supervisor
};
export class ActionItemExicutionFormAssignment extends AcquaintanceFormAssignment {
  constructor() {
    super();
    this.formTypes = {
      ...actionItemExicutionAssignmentForms,
      ...this.formTypes
    };
  }
}
export default function(type) {
  return new ActionItemExicutionFormAssignment().getFormByType(type);
}
