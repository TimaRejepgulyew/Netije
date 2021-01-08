import { FreeApprovalFormAssignment } from "../free-approval/AssignmentFormComponent.js";
import AssignmentType from "../../../infrastructure/constants/assignmentType";
import documentProcessing from "./document-processing/index.vue";
import documentTerminated from "./document-terminated/index.vue";

const intranetExhangeAssignmentForms = {
  [AssignmentType.IntranetExchangeDocumentProcessingAssignment]: documentProcessing,
  [AssignmentType.IntranetExchangeDocumentTerminatedAssignment]: documentTerminated
};
export class IntranetExchangeFormAssignment extends FreeApprovalFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...intranetExhangeAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new IntranetExchangeFormAssignment().getFormByType(type);
}
