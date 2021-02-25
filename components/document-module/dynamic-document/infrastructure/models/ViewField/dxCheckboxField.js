import { BaseField } from "./BaseField";
export class DxCheckBoxField extends BaseField {
  editorType = "dxCheckBox";
  constructor(context, { editorType, ...options }) {
    super(context, options);
  }
}
