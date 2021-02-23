import EditorTypes from "../../constants/editorTypes";
export class BaseEditor {
  constructor({ context, value, storeId }) {
    this.context = context;
    this._setBaseValue(context, value);
    this._setStoreId(storeId);
  }
  static get baseSettingField() {
    return [
      "id",
      "dataField",
      "translationRu",
      "translationTk",
      "editorType",
      "colSpan"
    ];
  }
  static clearFields(prevField) {
    let baseFields = BaseEditor.baseSettingField;
    let fieldArray = Object.entries(prevField);
    return Object.fromEntries(
      fieldArray.filter(el => {
        return baseFields.some(field => {
          return field === el[0];
        });
      })
    );
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
      isRequired: true,
      editorOptions: {
        showClearButton: true
      }
    };
  };
  _translationTk = () => {
    return {
      dataField: "translationTk",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationTk")
      },
      isRequired: true,
      editorOptions: {
        showClearButton: true
      }
    };
  };
  _translationRu = () => {
    return {
      dataField: "translationRu",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.translationRu")
      },
      isRequired: true,
      editorOptions: {
        showClearButton: true
      }
    };
  };
  _colSpan = () => {
    return {
      dataField: "colSpan",
      label: { text: this.context.$t("dinamicDocuments.updateField.colSpan") },
      editorType: "dxNumberBox",
      editorOptions: {
        max: "2",
        min: "1",
        showSpinButtons: true,
        showClearButton: true
      }
    };
  };
  _isRequired = () => {
    return {
      dataField: "isRequired",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.isRequired")
      },
      editorOptions: {
        showClearButton: true
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
