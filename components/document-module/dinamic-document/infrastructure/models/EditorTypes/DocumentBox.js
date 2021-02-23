import { SelectBoxEditor } from "./SelectBoxEditor";
export class DocumentBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "DocumentBox", storeId });
  }
}
