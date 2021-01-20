import * as documentStoresTemplate from "~/infrastructure/storeTemplate/documentStores/index.js";
export default class DocumentTemplateFactory {
  static createStore(documentTypeGuid) {
    switch (documentTypeGuid) {
      case DocumentType.IncomingLetter:
        return documentStoresTemplate.incomingLetter.createStore();
      case DocumentType.OutgoingLetter:
        return documentStoresTemplate.outgoingLetter.createStore();

      case DocumentType.Order:
      case DocumentType.CompanyDirective:
        return documentStoresTemplate.orderBase.createStore();

      case DocumentType.SimpleDocument:
        return documentStoresTemplate.simpleDocument.createStore();

      case DocumentType.Addendum:
        return documentStoresTemplate.addendum.createStore();

      case DocumentType.Memo:
        return documentStoresTemplate.memo.createStore();

      case DocumentType.PowerOfAttorney.createStore():
        return documentStoresTemplate.powerOfAttorney.createStore();

      case DocumentType.IncomingInvoice:
        return documentStoresTemplate.incomingInvoice.createStore();

      case DocumentType.ContractStatement:
        return documentStoresTemplate.contractStatement.createStore();

      case DocumentType.IncomingTaxInvoice:
        return documentStoresTemplate.incomingTaxInvoice.createStore();

      case DocumentType.OutgoingTaxInvoice:
        return documentStoresTemplate.outgoingTaxInvoice.createStore();

      case DocumentType.UniversalTransferDocument:
        return documentStoresTemplate.universalTransferDocument.createStore();

      case DocumentType.Waybill:
        return documentStoresTemplate.waybill.createStore();

      case DocumentType.Contract:
        return documentStoresTemplate.contract.createStore();

      case DocumentType.SupAgreement:
        return documentStoresTemplate.supAgreement.createStore();

      //TODO set DocumentTemplate Type Id
      case DocumentType.DocumentTemplate:
        return documentStoresTemplate.documentTemplate.createStore();

      default:
        throw "unsupported document type store module";
    }
  }
}
