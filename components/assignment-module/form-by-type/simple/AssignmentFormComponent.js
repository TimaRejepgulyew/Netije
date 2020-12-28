import { BaseFormNotification } from "../../infrastructure/models/BaseAssignmentForm.js";
import AssignmentType from "../../infrastructure/constans/assignmentType";
import assignment from "./assignment/index.vue";
import review from "./review/index.vue";
const simpleAssignmentForms = {
  [AssignmentType.SimpleAssignment]: assignment,
  [AssignmentType.ReviewAssignment]: review
};

export class SimpleFormAssignment extends BaseFormNotification {
  constructor() {
    super();
    this.formTypes = { ...simpleAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new SimpleFormAssignment().getFormByType(type);
}
