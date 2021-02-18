import { SelectBoxEditor } from "./SelectBoxEditor";
export class RecipientBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "RecipientBox", storeId });
  }
}
