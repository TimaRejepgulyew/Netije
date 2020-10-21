import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class IncomingLetter extends ElectronicDocument {
    constructor(options) {
        const mutations = {
            ...options?.mutations,
            SET_BUSINESS_UNIT_ID(state, payload) {
                if (checkDataChanged(state.document.businessUnitId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.businessUnitId = payload;
            },
            SET_DEPARTMENT_ID(state, payload) {
                if (checkDataChanged(state.document.departmentId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.departmentId = payload;
            },
            SET_VALID_TILL(state, payload) {
                if (checkDataChanged(state.document.validTill, payload)) {
                    state.isDataChanged = true;
                }
                state.document.validTill = payload;
            },
            SET_ISSUED_TO_ID(state, payload) {
                if (checkDataChanged(state.document.issuedToId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.issuedToId = payload;
            },
            SET_OUR_SIGNATORY_ID(state, payload) {
                if (checkDataChanged(state.document.ourSignatoryId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.ourSignatoryId = payload;
            },
        }
        const actions = {
            ...options?.actions,
        }
        super({ mutations, actions })
    }
}