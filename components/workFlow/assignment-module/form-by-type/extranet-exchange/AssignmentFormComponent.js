import { IntranetExchangeFormAssignment } from "../intronet-exchange/AssignmentFormComponent.js";
import AssignmentType from "../../../infrastructure/constants/assignmentType";
import documentProcessing from "./document-processing/index.vue";

const extranetExhangeAssignmentForms = {
  [AssignmentType.ExchangeDocumentProcessingAssignment]: documentProcessing
};
export class ExtranetExchangeFormAssignment extends IntranetExchangeFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...extranetExhangeAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new ExtranetExchangeFormAssignment().getFormByType(type);
}
