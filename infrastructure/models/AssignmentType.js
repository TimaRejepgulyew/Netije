import AssignmentTypeGuid from "~/infrastructure/constants/assignmentType.js"
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export default class AssignmentType {

  constructor(context) {
    this.elements = generatorMapObj({
      Constant: AssignmentTypeGuid,
      translateName: "assignment.type",
      context: context,
    });
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
  filterIsAssignment() {
    const allowTypes = [
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
  filteringIsNotification() {
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
  filteringIsReviewAssignment() {
    const allowTypes = [
      AssignmentTypeGuid.AcquaintanceFinishAssignment,
      AssignmentTypeGuid.ActionItemSupervisorAssignment,
      AssignmentTypeGuid.ReviewAssignment,
      AssignmentTypeGuid.FreeApprovalFinishAssignment,
    ]
    return this.filtering(allowTypes);
  }
  filterisAcquintanceAssignment() {
    const allowTypes = [
      AssignmentTypeGuid.AcquaintanceAssignment
    ]
    return this.filtering(allowTypes);
  }
  filterisActionItemExecutionAssignment() {
    const allowTypes = [
      AssignmentTypeGuid.ActionItemExecutionAssignment
    ]
    return this.filtering(allowTypes);
  }


}
