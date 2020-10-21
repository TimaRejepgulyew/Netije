import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class IncomingLetter extends ElectronicDocument {
    constructor(options) {
        const mutations = {
            ...options?.mutations,
        }
        const actions = {
            ...options?.actions,
        }
        super({ mutations, actions })
    }
}