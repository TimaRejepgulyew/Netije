import EditorTypeGuid from "../constants/editorTypes";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export default class EditorTypes {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: EditorTypeGuid,
      translateName: "dinamicDocuments.editorTypes",
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
