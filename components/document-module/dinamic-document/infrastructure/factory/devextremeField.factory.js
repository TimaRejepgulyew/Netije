import { EmployeeBoxField } from "../models/ViewField/EmployeeBoxField";
import { DxTextBoxField } from "../models/ViewField/dxTextBoxField";

import { DepartmentBoxField } from "../models/ViewField/DepartmentBoxField";
import { DxDateBoxField } from "../models/ViewField/dxDateBoxField";

import { RecipientBoxField } from "../models/ViewField/RecipientBoxField";
import { DxCheckBoxField } from "../models/ViewField/dxCheckBoxField";

import { BusinessUnitBoxField } from "../models/ViewField/BusinessUnitBoxField";
import { DxTextAreaField } from "../models/ViewField/dxTextAreaField";

import { CounterPartBoxField } from "../models/ViewField/CounterPartBoxField";
import { ContactBoxField } from "../models/ViewField/ContactBoxField";
export class devExtremeFieldFactory {
  DepartmentBox = DepartmentBoxField;
  RecipientBox = RecipientBoxField;
  EmployeeBox = EmployeeBoxField;
  BusinessUnitBox = BusinessUnitBoxField;
  dxTextBox = DxTextBoxField;
  dxDateBox = DxDateBoxField;
  dxCheckBox = DxCheckBoxField;
  dxTextArea = DxTextAreaField;
  CounterPartBox = CounterPartBoxField;
  ContactBox = ContactBoxField;

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
