import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";


export function GenerateGridApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.getAll
        case DocumentQuery.OutgoingLetter:
            return dataApi.outgoingLetter.getAll
        case DocumentQuery.Order:
            return dataApi.order.getAll
        case DocumentQuery.Addendum:
            return dataApi.addendum.getAll
        case DocumentQuery.CompanyDirective:
            return dataApi.companyDirective.getAll
        case DocumentQuery.ContractStatement:
            return dataApi.contractStatement.getAll
        case DocumentQuery.IncomingInvoice:
            return dataApi.incomingInvoice.getAll
        case DocumentQuery.IncomingTaxInvoice:
            return dataApi.incomingTaxInvoice.getAll
        case DocumentQuery.OutgoingTaxInvoice:
            return dataApi.outgoingTaxInvoice.getAll
        case DocumentQuery.Memo:
            return dataApi.memo.getAll
        case DocumentQuery.PowerOfAttorney:
            return dataApi.powerOfAttorney.getAll
        case DocumentQuery.SimpleDocument:
            return dataApi.simpleDocument.getAll
        case DocumentQuery.SupAgreement:
            return dataApi.supAgreement.getAll
        case DocumentQuery.Universaltransferdocument:
            return dataApi.universaltransferdocument.getAll
        case DocumentQuery.Waybill:
            return dataApi.waybill.getAll
        case DocumentQuery.AllDocuments:
            return dataApi.officialDocument.getAll
        case DocumentQuery.ContractualDocuments:
            return dataApi.contractualDocuments.getAll
        case DocumentQuery.AccountingDocuments:
            return dataApi.accountingDocuments.getAll
        case DocumentQuery.DynamicDocument:
            return dataApi.dynamicDocument.getAll
        case DocumentQuery.InternalDocuments:
            return dataApi.internalDocuments.getAll
        default:
            console.log("docQueryGrid", docQuery)
            break;
    }
}
export function GenerateApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.document
        case DocumentQuery.OutgoingLetter:
            return dataApi.outgoingLetter.document
        case DocumentQuery.Order:
            return dataApi.order.document
        case DocumentQuery.Addendum:
            return dataApi.addendum.document
        case DocumentQuery.CompanyDirective:
            return dataApi.companyDirective.document
        case DocumentQuery.ContractStatement:
            return dataApi.contractStatement.document
        case DocumentQuery.IncomingInvoice:
            return dataApi.incomingInvoice.document
        case DocumentQuery.IncomingTaxInvoice:
            return dataApi.incomingTaxInvoice.document
        case DocumentQuery.OutgoingTaxInvoice:
            return dataApi.outgoingTaxInvoice.document
        case DocumentQuery.Memo:
            return dataApi.memo.document
        case DocumentQuery.PowerOfAttorney:
            return dataApi.powerOfAttorney.document
        case DocumentQuery.SimpleDocument:
            return dataApi.simpleDocument.document
        case DocumentQuery.SupAgreement:
            return dataApi.supAgreement.document
        case DocumentQuery.Universaltransferdocument:
            return dataApi.universaltransferdocument.document
        case DocumentQuery.Waybill:
            return dataApi.waybill.document
        case DocumentQuery.DynamicDocument:
            return dataApi.dynamicDocument.document
        default:
            console.log("docQuerySolo", docQuery)

            break;
    }
}
