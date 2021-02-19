import { SelectBoxEditor } from "./SelectBoxEditor";
export class CounterPartBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "CounterPartBox", storeId });
  }
}
