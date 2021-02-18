import { DefaultEditor } from "./DefaultEditor";
import DateTypes from "../DateTypes/index";
export class DxDateBox extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxDateBox", storeId });
  }

  get _dateTypes() {
    return Object.values(new DateTypes(this.context).getAll());
  }
  get _dateType() {
    return {
      dataField: "dateType",
      editorType: "dxSelecBox",
      editorOptions: {
        dataSource: this._dateTypes,
        valueExpr: "id",
        displayExpr: "text"
      },
      isRequired: true
    };
  }
  get fieldSetting() {
    return [...super.fieldSetting, this._dateType()];
  }
}
