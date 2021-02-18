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
  _changeColSpan(value) {
    // colSpan change like service or store
  }
  _changeDataField(value) {
    // dataField change like service or store
  }
  _changeTranslationTk(value) {
    // translationTk change like service or store
  }
  _changeTranslationRu(value) {
    // translationRu change like service or store
  }
  _changeIsRequired(value) {
    // isrequired change like service or store
  }
  _setBaseValue(context, value) {
    this.text = context.$t(`dinamicDocument.editorTypes.${value}`);
    this.id = EditorTypes[value];
    this.value = value;
  }
  get _dataField() {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.dataField")
      },
      editorOptions: {
        value: this.context.currentField?.dataField,
        onValueChanged: this._changeDataFied
      },
      isRequired: true
    };
  }
  get _translationTk() {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationTk")
      },
      editorOptions: {
        value: this.context.currentField?.translationTk,
        onValueChanged: this._changeTranslationTk
      },
      isRequired: true
    };
  }
  get _translationRu() {
    return {
      dataField: "dataField",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationRu")
      },
      editorOptions: {
        value: this.context.currentField?.translationRu,
        onValueChanged: this._changeTranslationRu
      },
      isRequired: true
    };
  }
  get _editorType() {
    return {
      dataField: "editorType",
      editorOptions: {
        valueExpr: "id",
        displayExpr: "name",
        // dataSource: this.fieldSetting,
        value: this.context.currentField?.editorType,
        onValueChanged: this.context.change,
        isRequired: true
      },
      label: {
        text: this.context.$t("dinamicDocuments.updateField.editorType")
      },
      editorType: "dxSelectBox"
    };
  }
  get _colSpan() {
    return {
      dataField: "colSpan",
      editorOptions: {
        value: this.context.currentField?.colSpan,
        onValueChanged: this._changeColSpan
      },
      label: { text: this.context.$t("dinamicDocuments.updateField.colSpan") },
      editorType: "dxNumberBox"
    };
  }
  get _isRequired() {
    return {
      dataField: "isRequired",
      editorOptions: {
        value: this.context.currentField?.isRequired,
        onValueChanged: this._changeIsRequired
      },
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isRequired")
      },
      editorType: "dxSwitch"
    };
  }
  get _isMultiple() {
    return {
      dataField: "isMultiple",
      editorOptions: {
        value: this.context.currentField?.isMultiple
        //   onValueChanged: this.change
      },
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isMultiple")
      },
      editorType: "dxSwitch"
    };
  }
  get fieldSetting() {
    return [
      // this._editorType,
      this._isMultiple,
      this._isRequired,
      this._colSpan,
      this._translationRu,
      this._translationTk,
      this._dataField
    ];
  }
}
