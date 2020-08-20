import entityTypes from "./entityTypes";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as documentTypeIcon from "~/static/icons/document-type/index.js";
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
export default DocumentTypeGuid;

export class DocumentType {
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
  constructor(context, options) {
    this.elements = generatorMapObj({
      Constant: DocumentTypeGuid,
      translateName: "document.type",
      context: context,
      iconStores: documentTypeIcon
    });
  }
  getAll() {
    return this.elements;
  }
  filterRelationDocument() {
    const allowTypes = [
      DocumentTypeGuid.Addendum,
      DocumentTypeGuid.IncomingLetter,
      DocumentTypeGuid.OutgoingLetter
    ];
    return this.filtering(allowTypes);
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
export class RelationItemTypeGuid extends DocumentType {
  withVisibility(currentDocumentTypeGuid) {
    for (let documentType in this.documentTypes) {
      this.documentTypes[documentType].visible =
        currentDocumentTypeGuid !== +documentType;
    }
    return this;
  }
}
