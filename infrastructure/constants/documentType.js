import entityTypes from "./entityTypes";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import *as documentTypeIcon from "~/static/icons/document-type/index.js";
const DocumentTypeGuid = {
  IncomingLetter: 1,
  OutgoingLetter: 2,
  Order: 3,
  CompanyDirective: 4,
  SimpleDocument: 5,
  Addendum: 6,
  Memo: 7,
  PowerOfAttorney: 8,
  IncomingInvoice: 9,
  ContractStatement: 10,
  IncomingTaxInvoice: 11,
  OutgoingTaxInvoice: 12,
  UniversalTransferDocument: 13,
  Waybill: 14,
  Contract: 15,
  SupAgreement: 16
};

export const mapToEntityType = documentTypeGuid => {
  switch (documentTypeGuid) {
    case DocumentTypeGuid.IncomingLetter:
      return entityTypes.IncomingLetter;
    case DocumentTypeGuid.OutgoingLetter:
      return entityTypes.OutgoingLetter;
    case DocumentTypeGuid.Order:
      return entityTypes.Order;
    case DocumentTypeGuid.CompanyDirective:
      return entityTypes.CompanyDirective;
    case DocumentTypeGuid.SimpleDocument:
      return entityTypes.SimpleDocument;
    case DocumentTypeGuid.Addendum:
      return entityTypes.Addendum;
    case DocumentTypeGuid.Memo:
      return entityTypes.Memo;
    case DocumentTypeGuid.PowerOfAttorney:
      return entityTypes.PowerOfAttorney;
    case DocumentTypeGuid.IncomingInvoice:
      return entityTypes.IncomingInvoice;
    case DocumentTypeGuid.ContractStatement:
      return entityTypes.ContractStatement;
    case DocumentTypeGuid.IncomingTaxInvoice:
      return entityTypes.IncomingTaxInvoice;
    case DocumentTypeGuid.OutgoingTaxInvoice:
      return entityTypes.OutgoingTaxInvoice;
    case DocumentTypeGuid.UniversalTransferDocument:
      return entityTypes.UniversalTransferDocument;
    case DocumentTypeGuid.Waybill:
      return entityTypes.Waybill;
    case DocumentTypeGuid.Contract:
      return entityTypes.Contract;
    case DocumentTypeGuid.SupAgreement:
      return entityTypes.SupAgreement;
    default:
      throw "Unsupported document type";
  }
};

export function generateNameByDocTypeGuid(key, context) {
  const documentTypeGuidName = new Map();
  for (let el in DocumentTypeGuid) {
    documentTypeGuidName.set(
      DocumentTypeGuid[el],
      context.$t(`createItemDialog.${el[0].toLowerCase() + el.slice(1)}`.trim())
    );
  }
  return documentTypeGuidName.get(key);
}

export default DocumentTypeGuid;

export class DocumentType {
  constructor(context, options) {
    this.documentTypes = generatorMapObj({
      Constant: DocumentTypeGuid,
      translateName: "document.type",
      context: context,
      iconStores: documentTypeIcon
    });
  }
  getAll() {
    return this.documentTypes;
  }
  filterPaperWorkDocument() {
    const getPaperWorkDocument = {};
    for (let documentType in this.documentTypes) {
      if (documentType <= 8)
        getPaperWorkDocument[documentType] = this.documentTypes[documentType];
    }
    console.log(getPaperWorkDocument);
    return getPaperWorkDocument;
  }
  filterContract() {
    const contractDocument = {};
    for (let documentType in this.documentTypes) {
      switch (+documentType) {
        case DocumentTypeGuid.IncomingInvoice:
          contractDocument[
            DocumentTypeGuid.IncomingInvoice
          ] = this.documentTypes[DocumentTypeGuid.IncomingInvoice];
          break;
        case DocumentTypeGuid.ContractStatement:
          contractDocument[
            DocumentTypeGuid.ContractStatement
          ] = this.documentTypes[DocumentTypeGuid.ContractStatement];
          break;
        case DocumentTypeGuid.Contract:
          contractDocument[DocumentTypeGuid.Contract] = this.documentTypes[
            DocumentTypeGuid.Contract
          ];
          break;
        case DocumentTypeGuid.SupAgreement:
          contractDocument[DocumentTypeGuid.SupAgreement] = this.documentTypes[
            DocumentTypeGuid.SupAgreement
          ];
          break;
      }
    }
    return contractDocument;
  }
  filterFinancialArchive() {
    const financialArchive = {};
    for (let documentType in this.documentTypes) {
      switch (+documentType) {
        case DocumentTypeGuid.IncomingTaxInvoice:
          financialArchive[
            DocumentTypeGuid.IncomingTaxInvoice
          ] = this.documentTypes[DocumentTypeGuid.IncomingTaxInvoice];
          break;
        case DocumentTypeGuid.OutgoingTaxInvoice:
          financialArchive[
            DocumentTypeGuid.OutgoingTaxInvoice
          ] = this.documentTypes[DocumentTypeGuid.OutgoingTaxInvoice];
          break;
        case DocumentTypeGuid.UniversalTransferDocument:
          financialArchive[
            DocumentTypeGuid.ContraUniversalTransferDocumentct
          ] = this.documentTypes[DocumentTypeGuid.UniversalTransferDocument];
          break;
        case DocumentTypeGuid.Waybill:
          financialArchive[DocumentTypeGuid.Waybill] = this.documentTypes[
            DocumentTypeGuid.Waybill
          ];
      }
    }
    return financialArchive;
  }
}
