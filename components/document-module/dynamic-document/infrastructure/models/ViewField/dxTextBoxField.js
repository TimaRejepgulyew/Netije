import { BaseField } from "./BaseField";
export class DxTextBoxField extends BaseField {
  editorType = "dxTextBox";
  constructor(context, { editorType, ...options }) {
    super(context, options);
  }
}
