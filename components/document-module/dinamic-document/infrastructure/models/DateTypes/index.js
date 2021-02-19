import DateTypeGuid from "../../constants/dateTypes";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";

export class DateTypes {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: DateTypeGuid,
      translateName: "dinamicDocuments.dateTypes",
      context: context
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
