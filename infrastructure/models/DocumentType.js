import AbstractType from "~/infrastructure/models/AbstractType.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as documentTypeIcon from "~/static/icons/document-type/index.js";
export default class DocumentType extends AbstractType {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: DocumentTypeGuid,
      translateName: "document.type",
      context: context,
      iconStores: documentTypeIcon
    });
  }

  filterPaperWorkDocument() {
    const getPaperWorkDocument = {};
    for (let element in this.elements) {
      if (element <= 8) getPaperWorkDocument[element] = this.elements[element];
    }

    return getPaperWorkDocument;
  }
  filterContract() {
    const allowTypes = [
      DocumentTypeGuid.IncomingInvoice,
      DocumentTypeGuid.ContractStatement,
      DocumentTypeGuid.Contract,
      DocumentTypeGuid.SupAgreement
    ];
    // return this.filtering(allowTypes);
  }
  filterFinancialArchive() {
    const allowTypes = [
      DocumentTypeGuid.IncomingTaxInvoice,
      DocumentTypeGuid.OutgoingTaxInvoice,
      DocumentTypeGuid.UniversalTransferDocument,
      DocumentTypeGuid.Waybill,
      DocumentTypeGuid.SupAgreement
    ];

    // return this.filtering(allowTypes);
  }
}
