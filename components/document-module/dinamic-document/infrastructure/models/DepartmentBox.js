import { SelectBoxEditor } from "./SelectBoxEditor";
export class DepartmentBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "DepartmentBox", storeId });
  }
}
