import { SeletBoxField } from "./SelectBoxField";
export class EmployeeBoxField extends SeletBoxField {
  template = "EmployeeSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "EmployeeTagBox";
    }

    super(context, options);
  }
}
