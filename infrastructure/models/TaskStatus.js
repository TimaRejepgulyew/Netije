import TaskStatusGuid from "~/infrastructure/constants/taskStatus.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as taskStatusIcons from "~/static/icons/status/taskStatus.js";
export default class TaskStatus {
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: TaskStatusGuid,
      translateName: "task.status",
      context: context,
      iconStores: taskStatusIcons,
      ...options
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
}

