import EditorTypes from "../constants/editorTypes";
export class BaseEditor {
  multiple = false;
  isSelector = false;

  constructor({ context, value, storeId }) {
    this.context = context;
    this._setBaseValue(context, value);
    this._setStoreId(storeId);
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
  get dataField() {
    return {
      dataField: "dataField",
      label: {
        text: context.$t("dinamicDocuments.updateField.dataField")
      },
      editorOptions: {
        value: context.currentField?.dataField,
        onValueChanged: this._changeDataFied
      },
      isRequired: true
    };
  }
  get translationTk() {
    return {
      dataField: "dataField",
      label: {
        text: context.$t("dinamicDocuments.updateField.dataField")
      },
      editorOptions: {
        value: context.currentField?.translationTk,
        onValueChanged: this._changeTranslationTk
      },
      isRequired: true
    };
  }
  get translationRu(){
    return {
        dataField: "dataField",
        label: {
          text: context.$t("dinamicDocuments.updateField.dataField")
        },
        editorOptions: {
          value: context.currentField?.translationRu,
          onValueChanged: this._changeTranslationRu
        },
        isRequired: true
      };
  }
  _setBaseFieldSetting(context) {
    this.fieldSetting = [
      {
        itemType: "group",
        caption: this.$t("dinamicDocuments.captions.updateField"),
        items: [
          {
            dataField: "dataField",
            label: {
              text: this.$t("dinamicDocuments.updateField.dataField")
            },
            editorOptions: {
              value: this.currentField?.dataField,
              onValueChanged: this.changeDataFied
            },
            isRequired: true
          },
          {
            dataField: "translationTk",
            label: {
              text: this.$t("dinamicDocuments.updateField.tranlationTk")
            },
            editorOptions: {
              value: this.currentField?.translationTk,
              onValueChanged: this.changeDataFied
            },
            isRequired: true
          },
          {
            dataField: "translationRu",
            label: {
              text: this.$t("dinamicDocuments.updateField.tranlationRu")
            },
            editorOptions: {
              value: this.currentField?.translationRu,
              onValueChanged: this.changeDataFied
            },
            isRequired: true
          },
          {
            dataField: "colSpan",
            editorOptions: {
              value: this.colSpan,
              onValueChanged: this.changeColSpan
            },
            label: { text: context.$t("dinamicDocuments.updateField.colSpan") },
            editorType: "dxNumberBox"
          },
          {
            dataField: "isRequired",
            editorOptions: {
              value: this.currentField?.isRequired,
              onValueChanged: this.change
            },
            label: {
              text: this.$t("dinamicDocuments.updateField.isRequired")
            },
            editorType: "dxSwitch"
          },
          {
            dataField: "isMultiple",
            editorOptions: {
              value: this.currentField?.isMultiple,
              onValueChanged: this.change
            },
            label: {
              text: this.$t("dinamicDocuments.updateField.isMultiple")
            },
            editorType: "dxSwitch"
          },
          {
            dataField: "editorType",
            editorOptions: {
              valueExpr: "id",
              displayExpr: "name",
              dataSource: this.editorTypes,
              value: this.currentField?.editorType,
              onValueChanged: this.change,
              isRequired: true
            },
            label: {
              text: this.$t("dinamicDocuments.updateField.editorType")
            },
            editorType: "dxSelectBox"
          }
        ]
      }
    ];
  }
}
