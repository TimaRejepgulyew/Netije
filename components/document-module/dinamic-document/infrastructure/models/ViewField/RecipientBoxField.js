import { SeletBoxField } from "./SelectBoxField";
export class RecipientBoxField extends SeletBoxField {
  template = "RecipientSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    super(context, options);
    if (isMultiple) {
      this.template = "RecipientTagBox";
    }
  }
}
