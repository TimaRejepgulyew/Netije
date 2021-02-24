import { BaseField } from "./BaseField";
export class AutoCompleteField extends BaseField {
  template = "AutoCompleteBox";
  constructor(context, { ...options }) {
    super(context, options);
  }
}
