import AttachmentAccessRightGuid from "../constants/attachmentAccessRight.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export default class AttachmentAccessRight {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: AttachmentAccessRightGuid,
      translateName: "attachmentAccessRight.btns",
      context: context
    });
  }
  filtering(maxOperation) {
    const filterObj = {};
    for (let element in this.elements) {
      if (+element <= maxOperation) {
        filterObj[element] = this.elements[element];
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
