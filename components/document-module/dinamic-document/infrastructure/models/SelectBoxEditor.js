import { BaseEditor } from "./BaseEditor";
export class SelectBoxEditor extends BaseEditor {
  constructor(options) {
    this.isSelector = true;
    super(options);
  }
}
