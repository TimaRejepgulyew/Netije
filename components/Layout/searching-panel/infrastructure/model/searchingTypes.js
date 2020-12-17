import SearchingTypes from "../constant/searchingTypes";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as searchingTypesIcon from "../icon/search-by-items-icons/index.js";
export default class TaskStatus {
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: SearchingTypes,
      translateName: "searching.type",
      context: context,
      iconStores: searchingTypesIcon,
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
