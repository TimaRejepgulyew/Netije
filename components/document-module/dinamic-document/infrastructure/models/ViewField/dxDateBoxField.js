import { BaseField } from "./BaseField";
export class DxDateBoxField extends BaseField {
  editorType = "dxDateBox";
  constructor(context, { editorType, dateType, ...options }) {
    super(context, options);
    console.log(dateType);
    this.editorOptions.type = dateType;
    console.log(this);
  }
}
