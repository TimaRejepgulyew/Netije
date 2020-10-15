import entityTypes from "./entityTypes";
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
  SupAgreement: 16,
  DocumentTemplate: 17
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
    case DocumentTypeGuid.DocumentTemplate:
      return entityTypes.DocumentTemplate;

    default:
      throw "Unsupported document type";
  }
};
export default DocumentTypeGuid;



