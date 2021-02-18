import { DefaultEditor } from "./DefaultEditor";
export class DxTextBox extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxTextBox", storeId });
  }
}
