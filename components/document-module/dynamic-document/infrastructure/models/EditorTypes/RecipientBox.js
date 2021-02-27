import { SelectBoxEditor } from "./SelectBoxEditor";
import { IsMultiple } from "../SettingFields/IsMultiple";
export class RecipientBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "RecipientBox", storeId });
  }
  _isMultiple = () => {
    return new IsMultiple(this.context);
  };
  get fieldSetting() {
    return [...super.fieldSetting, this._isMultiple()];
  }
}
