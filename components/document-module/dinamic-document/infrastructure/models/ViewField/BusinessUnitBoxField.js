import { SeletBoxField } from "./SelectBoxField";
export class BusinessUnitBoxField extends SeletBoxField {
  template = "BusinessUnitSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "BusinessUnitTagBox";
    }

    super(context, options);
  }
}
