import { DocumentReviewFormAssignment } from "../document-review/AssignmentFormComponent.js";
import AssignmentType from "../../infrastructure/constants/assignmentType";
import assignment from "./assignment/index.vue";
import finish from "./finish/index.vue";
import rework from "./rework/index.vue";

const freeApprovalAssignmentForms = {
  [AssignmentType.FreeApprovalAssignment]: assignment,
  [AssignmentType.FreeApprovalFinishAssignment]: finish,
  [AssignmentType.FreeApprovalReworkAssignment]: rework
};
export class FreeApprovalFormAssignment extends DocumentReviewFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...freeApprovalAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new FreeApprovalFormAssignment().getFormByType(type);
}
