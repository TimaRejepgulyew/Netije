import * as resultIcon from "~/static/icons/status/assignmentResult.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
const Simple = {
  Complete: 0
};
const Acquaintance = {
  Acquainted: 0
};
const ActionItemExecution = {
  Complete: 0
};
const AcquaintanceFinish = {
  Accept: 0
};
const ActionItemSupervisor = {
  Accept: 0,
  ForRework: 1
};
const ReviewAssignment = {
  Accept: 0,
  ForRework: 1
};
const BaseResult = {
  Accept: 0,
  ForRework: 1
};
const PrepareDraftResolution = {
  SendForReview: 0,
  Explored: 1,
  AddAssignment: 2,
  Forward: 3
};
const ReviewDraftResolution = {
  ForExecution: 0,
  Informed: 1,
  ForRework: 2,
  Forward: 3
};
const ReviewManager = {
  AddAssignment: 0,
  AddResolution: 1,
  Explored: 2,
  Forward: 3
};
const ReviewResolution = {
  AddAssignment: 0
};
const FreeApprovalAssignment = {
  ForRework: 0,
  Approved: 1,
  Forward: 2
};
const FreeApprovalFinishAssignment = {
  completed:0
}
export default {
  FreeApprovalFinishAssignment,
  FreeApprovalAssignment,
  ReviewResolution,
  ReviewManager,
  ReviewDraftResolution,
  PrepareDraftResolution,
  BaseResult,
  ReviewAssignment,
  ActionItemSupervisor,
  AcquaintanceFinish,
  ActionItemExecution,
  Acquaintance,
  Simple
};

export const generateElementsResult = assignmentType => {
  const resultByType = {};
  for (let type in AssignmentType) {
    if (resultElements[type[0].toLowerCase() + type.slice(1)])
      resultByType[AssignmentType[type]] =
        resultElements[type[0].toLowerCase() + type.slice(1)];
    else resultByType[AssignmentType[type]] = resultElements["baseResult"];
  }
  return resultByType[assignmentType];
};
function simpleAssignment(context) {
  return generatorMapObj({
    Constant: Simple,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function acquaintanceAssignment(context) {
  return generatorMapObj({
    Constant: Acquaintance,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function actionItemExecutionAssignment(context) {
  return generatorMapObj({
    Constant: ActionItemExecution,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function acquaintanceFinishAssignment(context) {
  return generatorMapObj({
    Constant: AcquaintanceFinish,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function actionItemSupervisorAssignment(context) {
  return generatorMapObj({
    Constant: ActionItemSupervisor,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function reviewAssignmentAssignment(context) {
  return generatorMapObj({
    Constant: ReviewAssignment,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function baseResult(context) {
  return generatorMapObj({
    Constant: BaseResult,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function reviewResolutionAssignment(context) {
  return generatorMapObj({
    Constant: ReviewResolution,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function reviewManagerAssignment(context) {
  return generatorMapObj({
    Constant: ReviewManager,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function preparingDraftResolutionAssignment(context) {
  return generatorMapObj({
    Constant: PrepareDraftResolution,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
function reviewDraftResolutionAssignment(context) {
  return generatorMapObj({
    Constant: ReviewDraftResolution,
    translateName: "assignment.result",
    context: context,
    iconStores: resultIcon
  });
}
export const resultElements = {
  preparingDraftResolutionAssignment,
  reviewDraftResolutionAssignment,
  reviewManagerAssignment,
  reviewResolutionAssignment,
  baseResult,
  reviewAssignmentAssignment,
  actionItemSupervisorAssignment,
  acquaintanceFinishAssignment,
  actionItemExecutionAssignment,
  acquaintanceAssignment,
  simpleAssignment
};
