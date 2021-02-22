import { SeletBoxField } from "./SelectBoxField";
export class EmployeeBoxField extends SeletBoxField {
  template = "EmployeeSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    console.log(options);
    if (isMultiple) {
      this.template = "EmployeeTagbox";
    }

    super(context, options);
  }
}
