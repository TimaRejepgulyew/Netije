
import BaseDocumentStore from "~/infrastructure/models/document-store/Base.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class DocumentTemplate extends BaseDocumentStore {
    constructor(options) {
        const mutations = {
            ...options?.mutations,
            SET_DOCUMENT_KIND_ID(state, payload) {
                if (checkDataChanged(state.document.documentKindId, payload))
                    state.isDataChanged = true;
                state.document.documentKindId = payload;

            },
            SET_DOCUMENT_TYPE(state, payload) {
                if (checkDataChanged(state.document.documentType, payload)) {
                    state.isDataChanged = true;
                }
                state.document.documentType = payload;
            },
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
            SET_PARAM(state, payload) {
                if (checkDataChanged(state.document.params, payload)) {
                    state.isDataChanged = true;
                }
                state.document.params = payload;
            },
            SET_NOTE(state, payload) {
                if (checkDataChanged(state.document.note, payload)) {
                    state.isDataChanged = true;
                }
                state.document.note = payload;
            },

        }

        const actions = {
            ...options?.actions,
            setDocumentKind({ commit }, payload) {
                if (!payload) payload = docmentKindService.emptyDocumentKind();
                commit("SET_DOCUMENT_KIND", payload);
            },
        }
        super({ actions, mutations })
    }
}