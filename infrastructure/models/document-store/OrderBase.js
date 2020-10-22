import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class OrderBase extends ElectronicDocument {
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
            SET_ASSIGNEE_ID(state, payload) {
                if (checkDataChanged(state.document.assigneeId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.assigneeId = payload;
            },
            SET_OUR_SIGNATORY_ID(state, payload) {
                if (checkDataChanged(state.document.ourSignatoryId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.ourSignatoryId = payload;
            },
            SET_PREPARED_BY_ID(state, payload) {
                if (checkDataChanged(state.document.preparedById, payload)) {
                    state.isDataChanged = true;
                }
                state.document.preparedById = payload;
            },
        }
        const actions = {
            ...options?.actions,
        }
        super({ mutations, actions })
    }
}