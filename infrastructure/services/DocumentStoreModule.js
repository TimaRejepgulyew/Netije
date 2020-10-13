import StoreModule from "./StoreModule";
import * as documentStoresTemplate from "~/infrastructure/storeTemplate/documentStores/index.js"
import * as documentStoreTemplate from "~/infrastructure/storeTemplate/documentStore.js";
export default class DocumentStoreModule extends StoreModule {

    constructor() {
        super({ moduleName: "documents", storeTemplate: documentStoreTemplate })
    }
    setStoreTemplate(documentTypeGuid) {
        switch (documentTypeGuid) {
            //TODO set DocumentTemplate Type Id
            case 18:
                this.storeTemplate = documentStoresTemplate.documentTemplate
                break
            default:
                this.storeTemplate = documentStoreTemplate
                break

        }
        return this
    }
} 