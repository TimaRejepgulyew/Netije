import entityTypes from "./entityTypes"

export default DocumentTypeGuid;

const DocumentTypeGuid = {
  IncommingDocument: 1,
  OutgoingDocument: 2,
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
}

export const mapToEntityType = function (documentTypeGuid) {
  switch (documentTypeGuid) {
    case DocumentTypeGuid.IncommingDocument:
      return entityTypes.IncomingLetter;
  }
}