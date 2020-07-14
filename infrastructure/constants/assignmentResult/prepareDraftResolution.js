const PrepareDraftResolutionResult = {
  SendForReview: 0,
  Explored: 1,
  AddAssignment: 2,
  Forward: 3
};
export default PrepareDraftResolutionResult;

import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export function taskStatusGeneratorObj(context) {
  return generatorMapObj({
    Constant: PrepareDraftResolutionResult,
    translateName: "assignment.assignmentResult",
    context: context,
  });
}
