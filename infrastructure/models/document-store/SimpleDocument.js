import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"

export default class SimpleDocument extends ElectronicDocument {
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