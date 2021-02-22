import { SeletBoxField } from "./SelectBoxField";
export class RecipientBoxField extends SeletBoxField {
  template = "RecipientSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    console.log(options);
    if (isMultiple) {
      this.template = "RecipientTagBox";
    }

    super(context, options);
  }
}
