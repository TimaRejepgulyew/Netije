import EditorTypes from "../../constants/editorTypes";
export class BaseEditor {
  constructor({ context, value, storeId }) {
    this.context = context;
    this._setBaseValue(context, value);
    this._setStoreId(storeId);
  }
  getObject() {
    return {
      text: this.text,
      id: this.id,
      isRequired: false,
      dataSource: this.fieldSetting
    };
  }
  _setStoreId(id) {
    this.storeId = id;
  }
  _setBaseValue = (context, value) => {
    this.text = context.$t(`dinamicDocuments.editorTypes.${value}`);
    this.id = EditorTypes[value];
  };
  _dataField = () => {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.dataField")
      },
      isRequired: true
    };
  };
  _translationTk = () => {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationTk")
      },
      isRequired: true
    };
  };
  _translationRu = () => {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationRu")
      },
      isRequired: true
    };
  };
  _colSpan = () => {
    return {
      dataField: "colSpan",
      label: { text: this.context.$t("dinamicDocuments.updateField.colSpan") },
      editorType: "dxNumberBox"
    };
  };
  _isRequired = () => {
    return {
      dataField: "isRequired",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isRequired")
      },
      editorType: "dxSwitch"
    };
  };
  // _isMultiple = () => {
  //   return {
  //     dataField: "isMultiple",
  //     editorOptions: {
  //       // onValueChanged: this.change
  //     },
  //     label: {
  //       text: this.context.$t("dinamicDocuments.updateField.isMultiple")
  //     },
  //     editorType: "dxSwitch"
  //   };
  // };
  get fieldSetting() {
    return [
      // this._isMultiple(),
      this._isRequired(),
      this._colSpan(),
      this._translationRu(),
      this._translationTk(),
      this._dataField()
    ];
  }
}
