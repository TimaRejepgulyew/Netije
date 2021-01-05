import * as resultIcon from "~/static/icons/status/assignmentResult.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import AssignmentType from "./assignmentType.js";
import { ReviewResult as Simple } from "../../form-by-type/simple/assignment/infrastructure";
import { ReviewResult as ReviewAssignment } from "../../form-by-type/simple/review/infrastructure";
import { ReviewResult as Acquaintance } from "../../form-by-type/acquaintance/assignment/infrastructure";
import { ReviewResult as AcquaintanceFinish } from "../../form-by-type/acquaintance/finish/infrastructure";
import { ReviewResult as ActionItemExecution } from "../../form-by-type/action-item-exicution/assignment/infrastructure";
import { ReviewResult as ActionItemSupervisor } from "../../form-by-type/action-item-exicution/supervisor/infrastructure";
import { ReviewResult as PrepareDraftResolution } from "../../form-by-type/document-review/prepare-draft-resolution/infrastructure";
import { ReviewResult as ReviewDraftResolution } from "../../form-by-type/document-review/review-draft-resolution/infrastructure";
import { ReviewResult as ReviewManager } from "../../form-by-type/document-review/review-manager/infrastructure";
import { ReviewResult as ReviewResolution } from "../../form-by-type/document-review/review-resolution/infrastructure";
import { ReviewResult as FreeApprovalAssignment } from "../../form-by-type/free-approval/assignment/infrastructure";
import { ReviewResult as FreeApprovalReworkAssignment } from "../../form-by-type/free-approval/rework/infrastructure";
import { ReviewResult as FreeApprovalFinishAssignment } from "../../form-by-type/free-approval/finish/infrastructure";
const BaseResult = {
    Accept: 0,
    ForRework: 1
  };
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
    Simple,
    FreeApprovalReworkAssignment
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
  function freeApprovalAssignment(context) {
    return generatorMapObj({
      Constant: FreeApprovalAssignment,
      translateName: "assignment.result",
      context: context,
      iconStores: resultIcon
    });
  }
  function freeApprovalFinishAssignment(context) {
    return generatorMapObj({
      Constant: FreeApprovalFinishAssignment,
      translateName: "assignment.result",
      context: context,
      iconStores: resultIcon
    });
  }
  function freeApprovalReworkAssignment(context) {
    return generatorMapObj({
      Constant: FreeApprovalReworkAssignment,
      translateName: "assignment.result",
      context: context,
      iconStores: resultIcon
    });
  }
  export const resultElements = {
    freeApprovalReworkAssignment,
    freeApprovalFinishAssignment,
    freeApprovalAssignment,
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