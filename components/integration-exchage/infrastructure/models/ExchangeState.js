import ExchangeStateGuid from "../constants/exchangeState.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";

export default class ExchangeState {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: ExchangeStateGuid,
      translateName: "exchange.exchangeState",
      context: context,
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
