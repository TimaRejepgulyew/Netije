import { ActionItemExicutionFormAssignment } from "../action-item-exicution/AssignmentFormComponent.js";
import AssignmentType from "../../infrastructure/constants/assignmentType";
import prepareDraftResolution from "./prepare-draft-resolution/index.vue";
import reviewDraftResolution from "./review-draft-resolution/index.vue";
import reviewManager from "./review-manager/index.vue";
import reviewResolution from "./review-resolution/index.vue";
const documentReviewAssignmentForms = {
  [AssignmentType.PreparingDraftResolutionAssignment]: prepareDraftResolution,
  [AssignmentType.ReviewDraftResolutionAssignment]: reviewDraftResolution,
  [AssignmentType.ReviewManagerAssignment]: reviewManager,
  [AssignmentType.ReviewResolutionAssignment]: reviewResolution
};
export class DocumentReviewFormAssignment extends ActionItemExicutionFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...documentReviewAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new DocumentReviewFormAssignment().getFormByType(type);
}
