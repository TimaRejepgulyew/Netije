import QuiсkFilter from "~/infrastructure/constants/quickFilter/taskQuickFilter.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export default class Documents {
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: QuiсkFilter,
      translateName: "task.quickFilter",
      context: context,
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