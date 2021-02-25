import { SelectBoxEditor } from "./SelectBoxEditor";
export class EmployeeBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "EmployeeBox", storeId });
  }
}
