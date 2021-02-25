import { SelectBoxEditor } from "./SelectBoxEditor";
export class ContactBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "ContactBox", storeId });
  }
}
