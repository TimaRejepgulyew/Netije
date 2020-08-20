import DocumentType from "~/infrastructure/models/DocumentType.js";
import { createLeadingDocument } from "~/infrastructure/constants/creatingItems.js";
export default class RelationDocumentType extends DocumentType {
  init() {
    const allowTypes = [
      DocumentTypeGuid.Addendum,
      DocumentTypeGuid.IncomingLetter,
      DocumentTypeGuid.OutgoingLetter
    ];
    this.elements = this.filtering(allowTypes);
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
        const { documentId, documentTypeGuid } = await createLeadingDocument(
          context,
          {
            documentType: +this.id,
            leadingDocumentId: context.documentId,
            leadingDocumentType: context.document.documentTypeGuid
          }
        );
        return { documentId, documentTypeGuid };
      };
    }
    return this;
  }
}
