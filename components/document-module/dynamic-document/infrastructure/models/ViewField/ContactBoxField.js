import { SeletBoxField } from "./SelectBoxField";
export class ContactBoxField extends SeletBoxField {
  template = "ContactSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "ContactTagBox";
    }

    super(context, options);
  }
}
