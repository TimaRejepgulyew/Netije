import TaskType from "~/components/workFlow/infrastructure/constants/taskType.js";
import ToolbarItemTypeWidget from "~/infrastructure/models/ToolbarItem/ToolbarItemTypeWidget.js";
import ToolbarItemTypeTemplate from "~/infrastructure/models/ToolbarItem/ToolbarItemTypeTemplate.js";
export default function(context, taskType) {
  return getToolbarByAssignmentType(context, taskType);
}
function getToolbarByAssignmentType(context, taskType) {
  switch (taskType) {
    case TaskType.SimpleTask:
      return simpleTaskToolbar(context);
    case TaskType.AcquaintanceTask:
      return acquaintanceTaskToolbar(context);
    case TaskType.ActionItemExecutionTask:
      return actionItemExecutionTaskToolbar(context);
    case TaskType.DocumentReviewTask:
      return documentReviewTaskToolbar(context);
    case TaskType.FreeApprovalTask:
      return freeApprovalTaskToolbar(context);
    case TaskType.ExchangeDocumentProcessingTask:
      return exchangeTaskToolbar(context);
    case TaskType.IntranetExchangeDocumentProcessingTask:
      return intranetExchangeTaskToolbar(context);
  }
}
const simpleTaskToolbar = context => {
  return [
    startBtn(context),
    saveBtn(context),
    restartBtn(context),
    abortBtn(context),
    importanceChangerBtn(context),
    createChildTaskBtn(context),
    accessRightsBtn(context),
    deleteBtn(context)
  ];
};
const acquaintanceTaskToolbar = context => {
  return [
    startBtn(context),
    saveBtn(context),
    restartBtn(context),
    abortBtn(context),
    importanceChangerBtn(context),
    createChildTaskBtn(context),
    accessRightsBtn(context),
    deleteBtn(context)
  ];
};
const actionItemExecutionTaskToolbar = context => {
  return [
    startBtn(context),
    saveBtn(context),
    restartBtn(context),
    abortActionItemBtn(context),
    importanceChangerBtn(context),
    switchToCompountBtn(context),
    createChildTaskBtn(context),
    accessRightsBtn(context),
    deleteBtn(context)
  ];
};
const documentReviewTaskToolbar = context => {
  return [
    startBtn(context),
    saveBtn(context),
    restartBtn(context),
    abortBtn(context),
    importanceChangerBtn(context),
    createChildTaskBtn(context),
    accessRightsBtn(context),
    deleteBtn(context)
  ];
};
const freeApprovalTaskToolbar = context => {
  return [
    startBtn(context),
    saveBtn(context),
    restartBtn(context),
    abortBtn(context),
    importanceChangerBtn(context),
    createChildTaskBtn(context),
    accessRightsBtn(context),
    deleteBtn(context)
  ];
};
const intranetExchangeTaskToolbar = context => {
  return [createChildTaskBtn(context)];
};
const exchangeTaskToolbar = context => {
  return [createChildTaskBtn(context)];
};
function switchToCompountBtn(context, otherOptions) {
  const toolbarItemOptions = {
    template: "toolbarItemswichToCompoundActionItem",
    visible: context.isDraft,
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, toolbarItemOptions).options;
}
function startBtn(context, otherOptions) {
  const toolbarItemOptions = {
    template: "toolbarItemStartBtn",
    visible: context.canStart,
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, {
    ...toolbarItemOptions
  }).options;
}

function saveBtn(context, otherOptions) {
  const toolbarItemOptions = {
    visible: context.canSave,
    disabled: !context.isDataChanged,
    options: context.saveButtonOptions,
    ...otherOptions
  };
  return new ToolbarItemTypeWidget(context, toolbarItemOptions).options;
}
function accessRightsBtn(context, otherOptions) {
  const toolbarItemOptions = {
    template: "toolbarItemAccessRight",
    location: "after",
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, {
    ...toolbarItemOptions
  }).options;
}
function restartBtn(context, otherOptions) {
  const toolbarItemOptions = {
    visible: context.canRestart,
    options: context.restartButtonOptions,
    ...otherOptions
  };
  return new ToolbarItemTypeWidget(context, toolbarItemOptions).options;
}
function abortBtn(context, otherOptions) {
  const toolbarItemOptions = {
    visible: context.canAbort,
    options: context.abortButtonOptions,
    ...otherOptions
  };
  return new ToolbarItemTypeWidget(context, toolbarItemOptions).options;
}
function abortActionItemBtn(context, otherOptions) {
  const toolbarItemOptions = {
    visible: context.canAbort,
    template: "toolbarItemAbortActionItem",
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, toolbarItemOptions).options;
}
function importanceChangerBtn(context, otherOptions) {
  const toolbarItemOptions = {
    template: "toolbarItemImportanceChanger",
    disabled: !context.isDraft,
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, toolbarItemOptions).options;
}
function createChildTaskBtn(context, otherOptions) {
  const toolbarItemOptions = {
    template: "toolbarCreateChildTask",
    location: "before",
    visible: !context.isNew,
    ...otherOptions
  };
  return new ToolbarItemTypeTemplate(context, toolbarItemOptions).options;
}
function deleteBtn(context, otherOptions) {
  const toolbarItemOptions = {
    location: "after",
    visible: context.canDelete,
    options: context.deleteButtonOptions,
    ...otherOptions
  };
  return new ToolbarItemTypeWidget(context, toolbarItemOptions).options;
}
