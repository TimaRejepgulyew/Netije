import BaseThreadText from "./Base";
import TaskTypeModel from "../../models/TaskType";
import TaskTypeGuid from "../../constants/taskType";
import { load } from "../../services/taskService";
import WorkflowEntityTextType from "../../constants/workflowEntityTextType";

export default class TaskTreadText extends BaseThreadText {
  elements = {};
  constructor(context) {
    this.elements = new TaskTypeModel(context).getAll();
    console.log(this.elements);
  }
  __generateActionItemExecutionTaskSubject(entity) {
    if (entity.isCompoundActionItem) return this.$t("task.compoundActionItem");
    else if (entity?.actionItemType === ActionItemType.Component)
      return this.$t("task.actionItemType.Component");
    else return this.elements[TaskTypeGuid.ActionItemExecutionTask]?.text;
  }
  generateSubject(entity) {
    switch (entity.taskType) {
      case TaskTypeGuid.SimpleTask:
      case TaskTypeGuid.IntranetExchangeDocumentProcessingTask:
        return entity.subject;

      case TaskTypeGuid.ActionItemExecutionTask:
        return this.__generateActionItemExecutionTaskSubject(entity);

      default:
        return this.elements[entity.taskType].text;
    }
  }
  showTask(context, { id, taskType }) {
    context.$popup.taskCard(context, {
      params: { taskId: id, taskType },
      handler: load
    });
  }
  static displayDeadline(taskType) {
    return taskType !== WorkflowEntityTextType.Notice;
  }
}
