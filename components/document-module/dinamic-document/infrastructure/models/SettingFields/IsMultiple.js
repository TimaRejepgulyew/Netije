export class IsMultiple {
  options = {};
  constructor(context) {
    this.options = {
      dataField: "isMultiple",
      label: {
        text: context.$t("dinamicDocuments.updateField.isMultiple")
      },
      editorOptions: {
        showClearButton: true
      },
      editorType: "dxSwitch"
    };
    return this.options;
  }
}
