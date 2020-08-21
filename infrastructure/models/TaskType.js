import AbstractType from "~/infrastructure/models/AbstractType.js";
import TaskTypeGuid from "~/infrastructure/constants/taskType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as taskTypeIcons from "~/static/icons/taskType.js";
export default class TaskType {
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: TaskTypeGuid,
      translateName: "task.type",
      context: context,
      iconStores: taskTypeIcons,
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
}
