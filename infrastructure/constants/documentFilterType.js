const DocumentTypeFilter = {
  All: 100,
  IncomingDocument: 101,
  OutgoingDocument: 102,
  InternalDocument: 103,
  ContractualDocuments: 104,
  AccountingDocuments: 105,
  ContractsAndSupAgreements: 106,
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
  Universaltransferdocument: 13,
  Waybill: 14,
  Contract: 15,
  SupAgreement: 16
};
export default DocumentTypeFilter;
export function generateNameByDocFilter(key, context) {
  const documentTypeGuidName = new Map();
  for (let el in DocumentTypeFilter) {
    documentTypeGuidName.set(
      DocumentTypeFilter[el],
      context.$t(`documentTypeFilter.${el[0].toLowerCase() + el.slice(1)}`)
    );
  }
  if (key) return documentTypeGuidName.get(key);
  documentTypeGuidName;
}
