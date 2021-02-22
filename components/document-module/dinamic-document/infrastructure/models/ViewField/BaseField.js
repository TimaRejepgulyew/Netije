export class BaseField {
  colSpan = 2;
  dataField = "";
  isRequired = false;
  editorOptions = {
    showClearButton: true,
    isRequired: false
  };

  constructor(
    context,
    {
      id,
      translationRu,
      translationTk,
      dataField,
      colSpan = 2,
      isRequired = false
    }
  ) {
    this.id = id;
    this.colSpan = colSpan;
    this.dataField = dataField;
    this.isRequired = isRequired;
    this.editorOptions.isRequired = isRequired;
    this.editorOptions.onFocusIn = data => {
      context.onFocusIn("focusin", data);
      console.log(data);
    };
    this._setLabel(context, { translationRu, translationTk });
    this._setValue(dataField);
  }
  getFielOptions() {
    return this;
  }
  _setValue(dataField) {
    this.editorOptions.value = dataField;
  }
  _setLabel(context, { translationRu, translationTk }) {
    this.label = {
      text: context.$i18n.locale === "ru" ? translationRu : translationTk
    };
  }
}
