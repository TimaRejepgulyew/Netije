import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class ContractStatement extends ElectronicDocument {
    constructor(options) {
        const mutations = {
            ...options?.mutations,
            SET_LEADING_DOCUMENT_ID(state, payload) {
                if (checkDataChanged(state.document.leadingDocumentId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.leadingDocumentId = payload;
            },
        }
        const actions = {
            ...options?.actions,
        }
        super({ mutations, actions })
    }
}