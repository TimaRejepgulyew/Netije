import { SelectBoxEditor } from "./SelectBoxEditor";
export class BusinessUnitBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "BusinessUnitBox", storeId });
  }
}
