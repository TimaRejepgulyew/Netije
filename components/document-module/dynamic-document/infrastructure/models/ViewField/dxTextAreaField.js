import { BaseField } from "./BaseField";
export class DxTextAreaField extends BaseField {
  editorType = "dxTextArea";
  constructor(context, { editorType, ...options }) {
    super(context, options);
  }
}
