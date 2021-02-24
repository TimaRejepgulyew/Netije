import { SeletBoxField } from "./SelectBoxField";
export class EmployeeBoxField extends SeletBoxField {
  template = "EmployeeSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    super(context, options);
    if (isMultiple) {
      this.template = "EmployeeTagBox";
    }
  }
}
