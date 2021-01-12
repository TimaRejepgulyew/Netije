import BaseThreadText from "./Base";
import TaskTypeModel from "../TaskType";
import TaskTypeGuid from "../../constants/taskType";
import ActionItemType from "../../constants/actionItemType";
import { load } from "../../services/taskService";

export default class TaskTreadText extends BaseThreadText {
  elements = {};
  constructor(context) {
    TaskTreadText.elements = new TaskTypeModel(context).getAll();
    super();
  }
  __generateActionItemExecutionTaskSubject(entity) {
    if (entity.isCompoundActionItem) return this.$t("task.compoundActionItem");
    else if (entity?.actionItemType === ActionItemType.Component)
      return this.$t("task.actionItemType.Component");
    else
      return TaskTreadText.elements[TaskTypeGuid.ActionItemExecutionTask]?.text;
  }
  generateSubject(entity) {
    switch (entity.taskType) {
      case TaskTypeGuid.SimpleTask:
      case TaskTypeGuid.IntranetExchangeDocumentProcessingTask:
        return entity.subject;

      case TaskTypeGuid.ActionItemExecutionTask:
        return this.__generateActionItemExecutionTaskSubject(entity);

      default:
        return TaskTreadText.elements[entity.taskType].text;
    }
  }
  showCard(context, { id, taskType }) {
    context.$popup.taskCard(context, {
      params: { taskId: id, taskType },
      handler: load
    });
  }
}
