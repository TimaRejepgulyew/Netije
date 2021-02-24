import { DefaultEditor } from "./DefaultEditor";
import { DateTypes } from "../DateTypes/index";
export class DxDateBox extends DefaultEditor {
  constructor(context, storeId) {
    super({ context, value: "DxDateBox", storeId });
  }

  _dateTypes = () => {
    //maybe error couse context
    return Object.values(new DateTypes(this.context).getAll());
  };
  _dateType = () => {
    return {
      dataField: "dateType",
      editorType: "dxSelectBox",
      label: {
        text: this.context.$t("dynamicDocuments.updateField.dateType")
      },
      editorOptions: {
       
        showClearButton: true,
        dataSource: this._dateTypes(),
        valueExpr: "id",
        displayExpr: "text"
      },
      isRequired: true
    };
  };
  // _minDate = () => {
  //   const type = this.context.fieldSetting;
  //   console.log(type);
  //   return {
  //     dataField: "minDate",
  //     editorType: "dxDateBox",
  //     label: {
  //       text: this.context.$t("dynamicDocuments.updateField.minDate")
  //     },
  //     editorOptions: {
  //       openOnFieldClick: true
  //     },
  //     isRequired: true
  //   };
  // };
  // _maxDate = () => {
  //   // console.log(this.context);
  //   return {
  //     dataField: "maxDate",
  //     editorType: "dxDateBox",
  //     label: {
  //       text: this.context.$t("dynamicDocuments.updateField.maxDate")
  //     },
  //     editorOptions: {
  //       openOnFieldClick: true
  //     },
  //     isRequired: true
  //   };
  // };
  get fieldSetting() {
    return [
      ...super.fieldSetting,
      this._dateType()
      // this._minDate(),
      // this._maxDate()
    ];
  }
}
