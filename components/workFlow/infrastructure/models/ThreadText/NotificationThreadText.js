import BaseThreadText from "./Base";
import AssignmentTypeModel from "../AssignmentType";
import AssignmentStatus from "../../constants/assignmentStatus";
export default class NotificationThreadText extends BaseThreadText {
  constructor(context) {
    super(context);
    NotificationThreadText.elements = new AssignmentTypeModel(context).getAll();
  }
  generateSubject(entity) {
    return NotificationThreadText.elements[entity.assignmentType]?.text;
  }
  showCard(context, { id }) {
    context.$popup.assignmentCard(context, {
      params: { assignmentId: id }
    });
  }
}
