import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as documentTypeIcon from "~/static/icons/document-type/index.js";
export default class DocumentType {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: DocumentTypeGuid,
      translateName: "document.type",
      context: context,
      iconStores: documentTypeIcon
    });
  }
  filtering(allowTypes) {
    const filterObj = {};
    for (let element in this.elements) {
      for (let allowType of allowTypes) {
        if (+element === allowType) {
          filterObj[element] = this.elements[element];
        }
      }
    }
    return filterObj;
  }
  getAll() {
    return this.elements;
  }
  getById(id) {
    return this.elements[id];
  }
  filterPaperWorkDocument() {
    const getPaperWorkDocument = {};
    for (let element in this.elements) {
      if (element <= 8) getPaperWorkDocument[element] = this.elements[element];
    }

    return getPaperWorkDocument;
  }
  filterRelationDocument() {
    const allowTypes = [
      DocumentTypeGuid.Addendum,
      DocumentTypeGuid.IncomingLetter,
      DocumentTypeGuid.OutgoingLetter
    ];
    return this.filtering(allowTypes);
  }
  filterContract() {
    const allowTypes = [
      DocumentTypeGuid.IncomingInvoice,
      DocumentTypeGuid.ContractStatement,
      DocumentTypeGuid.Contract,
      DocumentTypeGuid.SupAgreement
    ];
    return this.filtering(allowTypes);
  }
  filterFinancialArchive() {
    const allowTypes = [
      DocumentTypeGuid.IncomingTaxInvoice,
      DocumentTypeGuid.OutgoingTaxInvoice,
      DocumentTypeGuid.UniversalTransferDocument,
      DocumentTypeGuid.Waybill,
      DocumentTypeGuid.SupAgreement
    ];

    return this.filtering(allowTypes);
  }
}
