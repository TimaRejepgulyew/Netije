import TaskType from "./TaskType";
import { createTaskByDocument } from "~/infrastructure/services/taskService.js";
export default class ActionGuidBtn extends TaskType {
  init() {
    for (let element in this.elements) {
      console.log(element);
      this.elements[element].create = async (context, params) => {
        const { taskType, taskId } = await createTaskByDocument(context, {
          taskType: +element,
          ...params
        });
        return { taskType, taskId };
      };
    }
    return this;
  }
}
