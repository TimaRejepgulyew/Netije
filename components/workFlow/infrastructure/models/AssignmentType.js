import AssignmentTypeGuid from "../constants/assignmentType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as assignmentTypeGroupIcon from "~/static/icons/assignmentType/index.js"
export default class AssignmentType {

  constructor(context) {
    this.elements = generatorMapObj({
      Constant: AssignmentTypeGuid,
      translateName: "assignment.type",
      context: context,
    });
  }
  withIconGroup() {
    for (let element in this.filterAssignment()) {
      this.elements[element].icon = assignmentTypeGroupIcon.assignmentIcon
    }
    for (let element in this.filteringNotification()) {
      this.elements[element].icon = assignmentTypeGroupIcon.noticeIcon
    }
    for (let element in this.filteringReviewAssignment()) {
      this.elements[element].icon = assignmentTypeGroupIcon.underreviewIcon
    }
    this.elements[AssignmentTypeGuid.AcquaintanceAssignment].icon = assignmentTypeGroupIcon.acquintanceIcon
    return this
  }
  filtering(allowTypes) {
    const filterObj = {};
    for (let element in this.elements) {
      for (let allowType of allowTypes) {
        if (+element === allowType) {
          filterObj[element] = this.elements[element];
        }
      }
    }
    return filterObj;
  }
  getAll() {
    return this.elements;
  }
  getById(id) {
    return this.elements[id];
  }
  filterAssignment() {
    const allowTypes = [
      AssignmentTypeGuid.AcquaintanceAssignment,
      AssignmentTypeGuid.ReviewDraftResolutionAssignment,
      AssignmentTypeGuid.SimpleAssignment,
      AssignmentTypeGuid.ActionItemExecutionAssignment,
      AssignmentTypeGuid.PreparingDraftResolutionAssignment,
      AssignmentTypeGuid.ReviewManagerAssignment,
      AssignmentTypeGuid.ReviewResolutionAssignment,
      AssignmentTypeGuid.FreeApprovalAssignment,
      AssignmentTypeGuid.FreeApprovalReworkAssignment,
    ]
    return this.filtering(allowTypes);
  }
  filteringNotification() {
    const allowTypes = [
      AssignmentTypeGuid.Notice,
      AssignmentTypeGuid.ActionItemExecutionNotification,
      AssignmentTypeGuid.AcquaintanceNotification,
      AssignmentTypeGuid.ActionItemObserversNotification,
      AssignmentTypeGuid.ActionItemSupervisorNotification,
      AssignmentTypeGuid.ReviewObserverNotification,
      AssignmentTypeGuid.ReviewObserversNotification,
      AssignmentTypeGuid.ReviewClerkNotification,
      AssignmentTypeGuid.FreeApprovalNotification,
    ]
    return this.filtering(allowTypes);
  }
  filteringReviewAssignment() {
    const allowTypes = [
      AssignmentTypeGuid.AcquaintanceFinishAssignment,
      AssignmentTypeGuid.ActionItemSupervisorAssignment,
      AssignmentTypeGuid.ReviewAssignment,
      AssignmentTypeGuid.FreeApprovalFinishAssignment,
    ]
    return this.filtering(allowTypes);
  }




}
