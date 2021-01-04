import AssignmentStatusGuid from "../constants/assignmentStatus";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as assignmentStatusIcons from "~/static/icons/status/assignmentStatus.js";
export default class TaskStatus {
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: AssignmentStatusGuid,
      translateName: "assignment.status",
      context: context,
      iconStores: assignmentStatusIcons,
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
