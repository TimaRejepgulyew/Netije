import BaseThreadText from "./Base";
import * as indicators from "../../../thread-text/indicator-state/assignment-indicators/indicators.js";
import AssignmentTypeModel from "../AssignmentType";
import AssignmentStatus from "../../constants/assignmentStatus";
export default class AssignmentThreadText extends BaseThreadText {
  constructor(context) {
    super();
    AssignmentThreadText.elements = new AssignmentTypeModel(context).getAll();
    AssignmentThreadText.indicators = indicators;
  }
  generateSubject(entity) {
    return AssignmentThreadText.elements[entity.assignmentType]?.text;
  }
  showCard(context, { id }) {
    context.$popup.assignmentCard(context, {
      params: { assignmentId: id }
    });
  }
  __getInProcessIndicator(entity) {
    if (entity.isRead) {
      return AssignmentThreadText.indicators.statusIndicator;
    } else {
      return AssignmentThreadText.indicators.isReadIndicator;
    }
  }
  getIndicatorByStatus(entity) {
    switch (entity.status) {
      case AssignmentStatus.Completed:
        return AssignmentThreadText.indicators.resultIndicator;
      case AssignmentStatus.Aborted:
        return AssignmentThreadText.indicators.statusIndicator;
      case AssignmentStatus.InProcess:
        return this.__getInProcessIndicator(entity);
    }
  }
}
