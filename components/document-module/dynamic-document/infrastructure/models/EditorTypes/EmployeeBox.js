import { SelectBoxEditor } from "./SelectBoxEditor";
import { IsMultiple } from "../SettingFields/IsMultiple";
export class EmployeeBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "EmployeeBox", storeId });
  }
  _isMultiple = () => {
    return new IsMultiple(this.context);
  };
  get fieldSetting() {
    return [...super.fieldSetting, this._isMultiple()];
  }
}
