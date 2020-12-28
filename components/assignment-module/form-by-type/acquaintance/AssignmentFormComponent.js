import { SimpleFormAssignment } from "../simple/AssignmentFormComponent.js";
import AssignmentType from "../../infrastructure/constans/assignmentType";
import assignment from "./assignment/index.vue";
import finish from "./finish/index.vue";
const acquaintanceAssignmentForms = {
  [AssignmentType.AcquaintanceAssignment]: assignment,
  [AssignmentType.AcquaintanceFinishAssignment]: finish
};
export class AcquaintanceFormAssignment extends SimpleFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...acquaintanceAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new AcquaintanceFormAssignment().getFormByType(type);
}
