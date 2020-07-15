import resultIcon from "~/static/icons/status/assignmentResult.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
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
const ReviewManager = {
  AddAssignment: 0,
  AddResolution: 1,
  Explored: 2,
  Forward: 3
};
const ReviewResolution = {
  AddAssignment: 0
};
export default {
  ReviewResolution,
  ReviewManager,
  PrepareDraftResolution,
  BaseResult
};

export const generateElementsResult = assignmentType => {
  const resultByType = {};
  for (let type in AssignmentType) {
    if (resultElements[type])
      resultByType[AssignmentType[type]] = resultElements[type];
    else resultByType[AssignmentType[type]] = resultElements["baseResult"];
  }
  return resultByType[assignmentType];
};

function baseResult(context) {
  return generatorMapObj({
    Constant: BaseResult,
    translateName: "assignment.assignmentResult",
    context: context,
    iconStores: resultIcon
  });
}
function reviewResolution(context) {
  return generatorMapObj({
    Constant: ReviewResolution,
    translateName: "assignment.assignmentResult",
    context: context,
    iconStores: resultIcon
  });
}
function reviewManager(context) {
  return generatorMapObj({
    Constant: ReviewManager,
    translateName: "assignment.assignmentResult",
    context: context,
    iconStores: resultIcon
  });
}
function prepareDraftResolution(context) {
  return generatorMapObj({
    Constant: PrepareDraftResolution,
    translateName: "assignment.assignmentResult",
    context: context,
    iconStores: resultIcon
  });
}
export const resultElements = {
  prepareDraftResolution,
  reviewManager,
  reviewResolution,
  baseResult
};
