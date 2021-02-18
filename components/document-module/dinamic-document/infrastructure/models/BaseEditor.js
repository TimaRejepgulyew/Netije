import EditorTypes from "../constants/editorTypes";
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
      value: this.value,
      isRequired: false,
      dataSource: this.fieldSetting
    };
  }
  _setStoreId(id) {
    this.storeId = id;
  }
  _changeColSpan = value => {
    console.log(this);
    console.log(value, this.context);
    // this.context.currentField.colSpan = value;
  };
  _changeDataField = value => {
    console.log(this);
    this.context.currentField.dataField = value;
  };
  _changeTranslationTk = value => {
    console.log(this);
    this.context.currentField.translationTk = value;
  };
  _changeTranslationRu = value => {
    console.log(this);
    this.context.currentField.translationRu = value;
  };
  _changeIsRequired = value => {
    console.log(this);
    this.context.currentField.isRequired = value;
  };
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
      editorOptions: {
        onValueChanged: this._changeDataFied
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
      editorOptions: {
        onValueChanged: this._changeTranslationTk
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
      editorOptions: {
        onValueChanged: this._changeTranslationRu
      },
      isRequired: true
    };
  };
  _colSpan = () => {
    return {
      dataField: "colSpan",
      editorOptions: {
        onValueChanged: this._changeColSpan
      },
      label: { text: this.context.$t("dinamicDocuments.updateField.colSpan") },
      editorType: "dxNumberBox"
    };
  };
  _isRequired = () => {
    return {
      dataField: "isRequired",
      editorOptions: {
        onValueChanged: this._changeIsRequired
      },
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isRequired")
      },
      editorType: "dxSwitch"
    };
  };
  _isMultiple = () => {
    return {
      dataField: "isMultiple",
      editorOptions: {
        // onValueChanged: this.change
      },
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isMultiple")
      },
      editorType: "dxSwitch"
    };
  };
  get fieldSetting() {
    return [
      this._isMultiple(),
      this._isRequired(),
      this._colSpan(),
      this._translationRu(),
      this._translationTk(),
      this._dataField()
    ];
  }
}
