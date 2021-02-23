import { SeletBoxField } from "./SelectBoxField";
export class DocumentBoxField extends SeletBoxField {
  template = "DocumentSelectBox";
  constructor(context, { editorType, isMultiple, documentQuery, ...options }) {
    if (isMultiple) {
      this.template = "DocumentTagBox";
    }
    super(context, options);
    this.editorOptions.dataSourceQuery = documentQuery;
  }
}
