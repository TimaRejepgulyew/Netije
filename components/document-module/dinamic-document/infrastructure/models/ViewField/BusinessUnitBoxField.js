import { SeletBoxField } from "./SelectBoxField";
export class BusinessUnitBoxField extends SeletBoxField {
  template = "BusinessUnitSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    console.log(options);
    if (isMultiple) {
      this.template = "BusinessUnitTagBox";
    }

    super(context, options);
  }
}
