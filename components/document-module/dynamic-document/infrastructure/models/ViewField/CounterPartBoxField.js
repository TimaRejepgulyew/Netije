import { SeletBoxField } from "./SelectBoxField";
export class CounterPartBoxField extends SeletBoxField {
  template = "CounterPartSelectBox";
  constructor(context, { editorType, isMultiple, ...options }) {
    if (isMultiple) {
      this.template = "CounterPartTagBox";
    }

    super(context, options);
  }
}