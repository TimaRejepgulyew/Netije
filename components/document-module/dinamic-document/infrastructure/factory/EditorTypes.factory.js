import { DxTextBox } from "../models/DxTextBox";
import { DxTextAreaBox } from "../models/DxTextAreaBox";
import { DxDateBox } from "../models/DxDateBox";
import { DxCheckBox } from "../models/DxCheckBox";
import { EmployeeBox } from "../models/EmployeeBox";
import { RecipientBox } from "../models/RecipientBox";
import { BusinessUnitBox } from "../models/BusinessUnitBox";
import { DepartmentBox } from "../models/DepartmentBox";
import { CounterPartBox } from "../models/CounterPartBox";
import { ContactBox } from "../models/ContactBox";
class EditorTypes {
  constructor(context, storeId) {
    return [
      new DxTextBox(context, storeId).getObject(),
      new DxTextAreaBox(context, storeId).getObject(),
      new DxDateBox(context, storeId).getObject(),
      new DxCheckBox(context, storeId).getObject(),
      new EmployeeBox(context, storeId).getObject(),
      new RecipientBox(context, storeId).getObject(),
      new BusinessUnitBox(context, storeId).getObject(),
      new DepartmentBox(context, storeId).getObject(),
      new CounterPartBox(context, storeId).getObject(),
      new ContactBox(context, storeId).getObject()
    ];
  }
  static getDefaultEditorType(context, storeId) {
    return new DxTextBox(context, storeId).getObject();
  }
}
export default (context, storeId) => {
  return new EditorTypes(context, storeId);
};
export const getDefaultEditorType = (context, storeId) => {
  return EditorTypes.getDefaultEditorType(context, storeId);
};
