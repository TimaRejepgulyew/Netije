import StoreModule from "./StoreModule";
import * as documentStoresTemplate from "~/infrastructure/storeTemplate/documentStores/index.js"
import * as documentStoreTemplate from "~/infrastructure/storeTemplate/documentStore.js";
import DocumentType from '~/infrastructure/constants/documentType.js'
export default class DocumentStoreModule extends StoreModule {

    constructor() {
        super({ moduleName: "documents", storeTemplate: documentStoreTemplate })
    }
    setStoreTemplate(documentTypeGuid) {
        switch (documentTypeGuid) {
            case DocumentType.IncomingLetter:
                this.storeTemplate = documentStoresTemplate.incomingLetter
                break
            case DocumentType.OutgoingLetter:
                this.storeTemplate = documentStoresTemplate.outgoingLetter
                break
            case DocumentType.Order:
            case DocumentType.CompanyDirective:
                this.storeTemplate = documentStoresTemplate.orderBase
                break
            case DocumentType.SimpleDocument:
                this.storeTemplate = documentStoresTemplate.simpleDocument
                break
            case DocumentType.Addendum:
                this.storeTemplate = documentStoresTemplate.addendum
                break
            case DocumentType.Memo:
                this.storeTemplate = documentStoresTemplate.memo
                break
            case DocumentType.PowerOfAttorney:
                this.storeTemplate = documentStoresTemplate.powerOfAttorney
                break
            case DocumentType.IncomingInvoice:
                this.storeTemplate = documentStoresTemplate.incomingInvoice
                break
            case DocumentType.ContractStatement:
                this.storeTemplate = documentStoresTemplate.contractStatement
                break
            case DocumentType.IncomingTaxInvoice:
                this.storeTemplate = documentStoresTemplate.incomingTaxInvoice
                break
            case DocumentType.OutgoingTaxInvoice:
                this.storeTemplate = documentStoresTemplate.outgoingTaxInvoice
                break
            case DocumentType.UniversalTransferDocument:
                this.storeTemplate = documentStoresTemplate.universalTransferDocument
                break
            case DocumentType.Waybill:
                this.storeTemplate = documentStoresTemplate.waybill
                break
            case DocumentType.Contract:
                this.storeTemplate = documentStoresTemplate.contract
                break
            case DocumentType.SupAgreement:
                this.storeTemplate = documentStoresTemplate.supAgreement
                break

            //TODO set DocumentTemplate Type Id
            case DocumentType.DocumentTemplate:
                this.storeTemplate = documentStoresTemplate.documentTemplate
                break
            default:
                this.storeTemplate = documentStoreTemplate
                break

        }
        return this
    }
} 