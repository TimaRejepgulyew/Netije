import { DefaultEditor } from "./DefaultEditor";
export class DxTextArea extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxTextArea", storeId });
  }
}
