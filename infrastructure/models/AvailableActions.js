import TaskType from "./TaskType";

import TaskType from "~/infrastructure/models/TaskType.js";
import { createTaskByDocument } from "~/infrastructure/services/taskService.js";
export default class ActionGuidBtn extends TaskType {
  init() {
    for (let element in this.elements) {
      console.log(element);
      this.elements[element].create = (context, params) =>
        createTaskByDocument(context, { taskType: +element, ...params });
    }
    return this;
  }
}
