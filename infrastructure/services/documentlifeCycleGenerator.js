import {
  lifeCycleStateStoreType1,
  lifeCycleStateStoreType2,
  lifeCycleStateStoreType3,
  lifeCycleStateStoreContract,
  lifeCycleStateStoreIncomingInvoice
} from "~/infrastructure/constants/lifeCycleState.js";
import DocumentType from "~/infrastructure/constants/documentType.js";
export default function generateLifeCycleItemState(context, documentTypeGuid) {
  switch (documentTypeGuid) {
    case DocumentType.IncomingLetter:
    case DocumentType.OutgoingLetter:
      return lifeCycleStateStoreType1(context);
    case DocumentType.Order:
    case DocumentType.CompanyDirective:
    case DocumentType.SimpleDocument:
    case DocumentType.Addendum:
    case DocumentType.Memo:
    case DocumentType.PowerOfAttorney:
    case DocumentType.ContractStatement:
    case DocumentType.Waybill:
    case DocumentType.UniversalTransferDocument:
      return lifeCycleStateStoreType2(context);
    case DocumentType.IncomingTaxInvoice:
    case DocumentType.OutgoingTaxInvoice:
      return lifeCycleStateStoreType3(context);
    case DocumentType.Contract:
    case DocumentType.SupAgreement:
      return lifeCycleStateStoreContract(context);
    case DocumentType.IncomingInvoice:
      return lifeCycleStateStoreIncomingInvoice(context);
  }
}
