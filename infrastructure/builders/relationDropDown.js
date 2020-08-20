import { createLeadingDocument } from "~/infrastructure/services/documentService.js";

export default class RelationDropDownBtnOption {
  constructor({ items }) {
    this.items = items.map(item => new RelationDropDownItemOption(item));
  }
  useSelectMode = false;
  splitButton = false;
  dropDownOptions = { width: 330 };
  icon = "link";
  displayExpr = "text";
  itemClick(e, context, params) {
    console.log(params, "click");
    e.itemData.create(context, params);
  }
}
class RelationDropDownItemOption {
  constructor({ ...options }) {
    for (let option in options) {
      this[option] = options[option];
    }
  }
 
  async create(context, params) {
    const { documentId, documentTypeGuid } = await createLeadingDocument(
      context,
      {
        documentType: +this.id,
        ...params
      }
    );
    return { documentId, documentTypeGuid };
  }
}
