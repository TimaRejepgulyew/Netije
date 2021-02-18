import { DefaultEditor } from "./DefaultEditor";
export class DxDateBox extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxDateBox", storeId });
  }
  get fieldSetting() {
    return [this._isMultiple(), this._isRequired()];
  }
}
