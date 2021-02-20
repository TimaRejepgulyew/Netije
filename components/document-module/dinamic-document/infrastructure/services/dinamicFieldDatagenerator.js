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
export class FieldGenerator {
  static dxTextBox = DxTextBox;
  static dxTextAreaBox = DxTextAreaBox;
  static dxDateBox = DxDateBox;
  static dxCheckBox = DxCheckBox;
  static EmployeeBox = EmployeeBox;
  static RecipientBox = RecipientBox;
  static BusinessUnitBox = BusinessUnitBox;
  static DepartmentBox = DepartmentBox;
  static CounterPartBox = CounterPartBox;
  static ContactBox = ContactBox;
  static generatorData({ editorType, fieldData }) {
    console.log(editorType);
    if (editorType) {
      const newFieldData = FieldGenerator[editorType].clearFields(fieldData);
      return newFieldData;
    }
    return dxTextBox.clearFields(fieldData);
  }
}
