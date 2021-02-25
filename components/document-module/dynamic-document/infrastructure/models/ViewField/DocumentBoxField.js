import { SeletBoxField } from "./SelectBoxField";
export class DocumentBoxField extends SeletBoxField {
  template = "DocumentSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "DocumentTagBox";
    }

    super(context, options);
  }
}
