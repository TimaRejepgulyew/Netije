import DocumentType from "~/infrastructure/models/DocumentType.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { createLeadingDocument } from "~/infrastructure/services/documentService.js";
export default class RelationDocumentType extends DocumentType {
  init(currentDocumentTypeGuid) {
    // this.elements = this.filtering(allowTypes);
    this.filterByTypeGuid(currentDocumentTypeGuid).withMethodCreate();
    return this;
  }
  filterByTypeGuid(currentDocumentTypeGuid) {
    let allowTypes = [];
    switch (currentDocumentTypeGuid) {
      case DocumentTypeGuid.IncomingLetter:
        allowTypes = [
          DocumentTypeGuid.OutgoingLetter,
          DocumentTypeGuid.Addendum
        ];
        break;
      case DocumentTypeGuid.OutgoingLetter:
        allowTypes = [
          DocumentTypeGuid.IncomingLetter,
          DocumentTypeGuid.Addendum
        ];
        break;
      default:
        allowTypes = [DocumentTypeGuid.Addendum];
        break;
    }
    this.elements = this.filtering(allowTypes);
    return this;
  }

  withMethodCreate() {
    for (let element in this.elements) {
      this.elements[element].create = (
        context,
        { params, handler = createLeadingDocument },
        popupSettings
      ) => {
        context.$popup.documentCard(context, {
          params: {
            documentType: +element,
            ...params
          },
          handler
        });
      };
    }
    return this;
  }
}
