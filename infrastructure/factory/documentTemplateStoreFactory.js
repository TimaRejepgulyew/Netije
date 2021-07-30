import {
  DocumentTemplate,
  IncomingLetter,
  OutgoingLetter,
  Addendum,
  Memo,
  OrderBase,
  PowerOfAttorney,
  SimpleDocument,
  ContractStatement,
  Contract,
  IncomingInvoice,
  IncomingTaxInvoice,
  SupAgreement,
  OutgoingTaxInvoice,
  UniversalTransferDocument,
  Waybill,
  // DynamicDocument
} from "~/infrastructure/storeTemplate/documentStores/index.js";
import DocumentType from "~/infrastructure/constants/documentType";

export default class DocumentTemplateStoreFactory {
  constructor() { }

  static createStore(documentTypeGuid) {
    switch (documentTypeGuid) {
      case DocumentType.IncomingLetter:
        return new IncomingLetter().createStore();
      case DocumentType.OutgoingLetter:
        return new OutgoingLetter().createStore();

      case DocumentType.Order:
      case DocumentType.CompanyDirective:
        return new OrderBase().createStore();

      case DocumentType.SimpleDocument:
        return new SimpleDocument().createStore();

      case DocumentType.Addendum:
        return new Addendum().createStore();

      case DocumentType.Memo:
        return new Memo().createStore();

      case DocumentType.PowerOfAttorney:
        return new PowerOfAttorney().createStore();

      case DocumentType.IncomingInvoice:
        return new IncomingInvoice().createStore();

      case DocumentType.ContractStatement:
        return new ContractStatement().createStore();

      case DocumentType.IncomingTaxInvoice:
        return new IncomingTaxInvoice().createStore();

      case DocumentType.OutgoingTaxInvoice:
        return new OutgoingTaxInvoice().createStore();

      case DocumentType.UniversalTransferDocument:
        return new UniversalTransferDocument().createStore();

      case DocumentType.Waybill:
        return new Waybill().createStore();

      case DocumentType.Contract:
        return new Contract().createStore();

      case DocumentType.SupAgreement:
        return new SupAgreement().createStore();

      case DocumentType.DocumentTemplate:
        return new DocumentTemplate().createStore();
      // case DocumentType.DynamicDocument:
      //   return new DynamicDocument().createStore();
      default:
        throw "unsupported document type store module";
    }
  }
}
