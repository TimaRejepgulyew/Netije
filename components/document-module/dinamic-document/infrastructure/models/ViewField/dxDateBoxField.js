import { BaseField } from "./BaseField";
export class DxDateBoxField extends BaseField {
  editorType = "dxDateBox";
  constructor(context, { editorType, dateType, ...options }) {
    super(context, options);
    this.editorOptions.type = dateType;
  }
}
