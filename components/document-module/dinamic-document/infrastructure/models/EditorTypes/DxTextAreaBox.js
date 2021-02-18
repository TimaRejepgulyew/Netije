import { DefaultEditor } from "./DefaultEditor";
export class DxTextAreaBox extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxTextArea", storeId });
  }
}
