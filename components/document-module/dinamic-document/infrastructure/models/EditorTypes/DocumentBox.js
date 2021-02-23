import { SelectBoxEditor } from "./SelectBoxEditor";
import { DocumentQuery } from "~/infrastructure/models/DocumentQuery.js";
export class DocumentBox extends SelectBoxEditor {
  constructor(context, storeId) {
    super({ context, value: "DocumentBox", storeId });
  }
  _documentQueries = () => {
    return Object.values(new DocumentQuery(this.context).getAll());
  };
  _allowDocumentCategories = () => {
    return {
      dataField: "documentQuery",
      editorType: "dxSelectBox",
      label: {
        text: this.context.$t("dinamicDocuments.updateField.documentQuery")
      },
      editorOptions: {
        dataSource: this._documentQueries(),
        valueExpr: "id",
        displayExpr: "text"
      },
      isRequired: true
    };
  };
  get fieldSetting() {
    return [
      ...super.fieldSetting,
      this._allowDocumentCategories()
    ];
  }
}
