import { SeletBoxField } from "./SelectBoxField";
export class DepartmentBoxField extends SeletBoxField {
  template = "DepartmentSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "DepartmentTagbox";
    }

    super(context, options);
  }
}
