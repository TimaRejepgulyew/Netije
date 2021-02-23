import { DxTextBox } from "../models/EditorTypes/DxTextBox";
import { DxTextArea } from "../models/EditorTypes/DxTextArea";
import { DxDateBox } from "../models/EditorTypes/DxDateBox";
import { DxCheckBox } from "../models/EditorTypes/DxCheckBox";
import { EmployeeBox } from "../models/EditorTypes/EmployeeBox";
import { RecipientBox } from "../models/EditorTypes/RecipientBox";
import { BusinessUnitBox } from "../models/EditorTypes/BusinessUnitBox";
import { DepartmentBox } from "../models/EditorTypes/DepartmentBox";
import { CounterPartBox } from "../models/EditorTypes/CounterPartBox";
import { ContactBox } from "../models/EditorTypes/ContactBox";
import { DocumentBox } from "../models/EditorTypes/DocumentBox";
export class FieldGenerator {
  static dxTextBox = DxTextBox;
  static dxTextArea = DxTextArea;
  static dxDateBox = DxDateBox;
  static dxCheckBox = DxCheckBox;
  static EmployeeBox = EmployeeBox;
  static RecipientBox = RecipientBox;
  static BusinessUnitBox = BusinessUnitBox;
  static DepartmentBox = DepartmentBox;
  static CounterPartBox = CounterPartBox;
  static ContactBox = ContactBox;
  static DocumentBox = DocumentBox;
  static generatorData({ editorType, fieldData }) {
    if (editorType) {
      const newFieldData = FieldGenerator[editorType].clearFields(fieldData);
      return newFieldData;
    }
    return dxTextBox.clearFields(fieldData);
  }
}
