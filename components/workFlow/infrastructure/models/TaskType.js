import TaskTypeGuid from "../constants/taskType.js";
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
  getById(id) {
    return this.elements[id];
  }
  getExcludeBy(excludeTypes) {
    const filterObj = this.elements;
    for (let excludeType of excludeTypes) {
      delete filterObj[excludeType];
    }

    return filterObj;
  }
  getResolutionTask() {
    return this.filtering([TaskTypeGuid.DocumentReviewTask, TaskTypeGuid.ActionItemExecutionTask])
  }
}
