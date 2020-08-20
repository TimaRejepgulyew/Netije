export default class RelationDocumentType extends DocumentType {
  constructor() {
    this.elements = this.filterRelationDocument();
  }
  filterRelationDocument() {
    const allowTypes = [
      DocumentTypeGuid.Addendum,
      DocumentTypeGuid.IncomingLetter,
      DocumentTypeGuid.OutgoingLetter
    ];
    return this.filtering(allowTypes);
  }
  withVisibility(currentDocumentTypeGuid) {
    for (let element in this.elements) {
      this.elements[element].visible = currentDocumentTypeGuid !== +element;
    }
    return this;
  }
  withMethodCreate(method) {
    for (let element in this.elements) {
      this.elements[element].create = async context => {
        const response = await method(context, { documentType: +element });
        return response;
      };
    }
    return this;
  }
}
