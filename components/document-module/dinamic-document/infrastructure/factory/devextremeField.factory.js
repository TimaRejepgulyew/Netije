import { EmployeeBoxField } from "../models/ViewField/EmployeeBoxField";
import { DxTextBoxField } from "../models/ViewField/dxTextBoxField";

export class devExtremeFieldFactory {
  EmployeeBox = EmployeeBoxField;
  dxTextBox = DxTextBoxField;
  constructor(сontext, fields) {
    const res = [];
    for (let field of fields) {
      const fieldEd = field.editorType;
      console.log(fieldEd);
      res.push(new this[fieldEd](сontext, field).getFielOptions());
    }
    console.log(res);
    return res;
  }
  static devExtremeFieldGenerate(context, fields) {}
}
