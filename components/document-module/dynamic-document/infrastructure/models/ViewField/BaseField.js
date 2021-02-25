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
    this.context = context;
    this.id = id;
    this.name = id;
    this.colSpan = colSpan;
    this.dataField = dataField;
    this.isRequired = isRequired;
    this.editorOptions.isRequired = isRequired;
    this.editorOptions.onFocusIn = data => {
      context.onFocusIn(this);
    };
    this._setLabel(context, { translationRu, translationTk });
    this._setEventValueChanged();
    console.log(this);
  }
  getFielOptions() {
    return this;
  }
  _setEventValueChanged() {
    this.editorOptions.onValueChanged = e => {
      console.log(this);
      this.context.change(e.value, this);
    };
  }
  _setLabel(context, { translationRu, translationTk }) {
    this.label = {
      text: context.$i18n.locale === "ru" ? translationRu : translationTk
    };
  }
}
