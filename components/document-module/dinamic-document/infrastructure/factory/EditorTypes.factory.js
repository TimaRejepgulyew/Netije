import { DxTextBox } from "../models/EditorTypes/DxTextBox";
import { DxTextAreaBox } from "../models/EditorTypes/DxTextAreaBox";
import { DxDateBox } from "../models/EditorTypes/DxDateBox";
import { DxCheckBox } from "../models/EditorTypes/DxCheckBox";
import { EmployeeBox } from "../models/EditorTypes/EmployeeBox";
import { RecipientBox } from "../models/EditorTypes/RecipientBox";
import { BusinessUnitBox } from "../models/EditorTypes/BusinessUnitBox";
import { DepartmentBox } from "../models/EditorTypes/DepartmentBox";
import { CounterPartBox } from "../models/EditorTypes/CounterPartBox";
import { ContactBox } from "../models/EditorTypes/ContactBox";
class EditorTypes {
  static DxTextBox = DxTextBox;
  static DxTextAreaBox = DxTextAreaBox;
  static DxDateBox = DxDateBox;
  static DxCheckBox = DxCheckBox;
  static EmployeeBox = EmployeeBox;
  static RecipientBox = RecipientBox;
  static BusinessUnitBox = BusinessUnitBox;
  static DepartmentBox = DepartmentBox;
  static CounterPartBox = CounterPartBox;
  static ContactBox = ContactBox;
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
  static getEditorType(context, storeId, editortypeId) {
    // get Editor type by id did not realize
    if (editortypeId)
      return new DxTextBox(context, storeId).getObject().dataSource;
    else return null;
  }
}
export default (context, storeId) => {
  return new EditorTypes(context, storeId);
};
export const getDefaultEditorType = (context, storeId) => {
  return EditorTypes.getDefaultEditorType(context, storeId);
};
export const getFieldSettingByEditorType = (context, storeId, editortypeId) => {
  EditorTypes.getEditorType(context, storeId, editortypeId);
};
