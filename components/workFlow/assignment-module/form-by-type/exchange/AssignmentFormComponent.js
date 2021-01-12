import { IntranetExchangeFormAssignment } from "../intranet-exchange/AssignmentFormComponent";
import AssignmentType from "../../../infrastructure/constants/assignmentType";
import documentProcessing from "./document-processing/index.vue";

const exhangeAssignmentForms = {
  [AssignmentType.ExchangeDocumentProcessingAssignment]: documentProcessing
};
export class ExchangeFormAssignment extends IntranetExchangeFormAssignment {
  constructor() {
    super();
    this.formTypes = { ...exhangeAssignmentForms, ...this.formTypes };
  }
}
export default function(type) {
  return new ExchangeFormAssignment().getFormByType(type);
}
