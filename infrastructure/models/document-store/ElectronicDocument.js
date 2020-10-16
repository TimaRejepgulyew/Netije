import BaseDocumentStore from "~/infrastructure/models/document-store/Base.js"
const documentRegistrationActions = () => {
    return {
        async registration({ dispatch }, payload) {
            const { data } = await this.$axios.post(
                dataApi.documentRegistration.RegisterDocument,
                payload
            );
            dispatch("loadDocument", data);
        },
        async unRegister({ dispatch, state }) {
            var { data } = await this.$axios.post(
                dataApi.documentRegistration.UnregisterDocument,
                {
                    documentTypeGuid: state.document.documentTypeGuid,
                    documentId: state.document.id
                }
            );
            dispatch("loadDocument", data);
        }
    }
}
const documentRegistrationMutation = () => {
    return {
        CLEAR_REGISTRATION_DATA(state) {
            state.document.documentRegisterId = null;
            state.document.registrationDate = null;
            state.document.registrationNumber = null;
        },
        SET_REGISTRATION_NUMBER(state, payload) {
            state.document.registrationNumber = "" + payload;
        },
        SET_REGISTRATION_DATE(state, payload) {
            state.document.registrationDate = payload;
        },
        SET_DOCUMENT_REGISTER_ID(state, payload) {
            state.document.documentRegisterId = payload;
        },

    }
}
const caseFileMutation = () => {
    return {
        SET_CASE_FILE_ID(state, payload) {
            if (checkDataChanged(state.document.caseFileId, payload)) {
                state.isDataChanged = true;
            }
            state.document.caseFileId = payload;
        },
        SET_PLACE_TO_CASE_FILE_DATE_ID(state, payload) {
            if (checkDataChanged(state.document.placedToCaseFileDate, payload)) {
                state.isDataChanged = true;
            }
            state.document.placedToCaseFileDate = payload;
        },
    }
}
const lifeCycleMutation = () => {
    return {
        SET_LIFE_CYCLE_STATE(state, payload) {
            if (checkDataChanged(state.document.lifeCycleState, payload)) {
                state.isDataChanged = true;
            }
            state.document.lifeCycleState = payload;
        },
        SET_INTERNAL_APPROVAL_STATE(state, payload) {
            if (checkDataChanged(state.document.internalApprovalState, payload)) {
                state.isDataChanged = true;
            }
            state.document.internalApprovalState = payload;
        },
        SET_EXTERNAL_APPROVAL_STATE(state, payload) {
            if (checkDataChanged(state.document.externalApprovalState, payload)) {
                state.isDataChanged = true;
            }
            state.document.externalApprovalState = payload;
        },
        SET_EXECUTION_STATE(state, payload) {
            if (checkDataChanged(state.document.executionState, payload)) {
                state.isDataChanged = true;
            }
            state.document.executionState = payload;
        },
        SET_CONTROL_EXECUTION_STATE(state, payload) {
            if (checkDataChanged(state.document.controlExecutionState, payload)) {
                state.isDataChanged = true;
            }
            state.document.controlExecutionState = payload;
        },
    }
}
export default class extends BaseDocumentStore {
    constructor() {

        this.mutation = {
            ...super.mutation(),
            ...lifeCycleMutation(),
            ...caseFileMutation(),
            ...documentRegistrationMutation(),
            SET_DOCUMENT_KIND(state, payload) {
                if (checkDataChanged(state.document.documentKindId, payload.id))
                    state.isDataChanged = true;

                state.document.documentKind = payload;
                if (payload) state.document.documentKindId = payload.id;
                else state.document.documentKindId = null;
            },
            SET_DEFAULT_NAME(state, payload) {
                state.document.name = payload;
            },
            SET_SUBJECT(state, payload) {
                if (checkDataChanged(state.document.subject, payload)) {
                    state.isDataChanged = true;
                }
                state.document.subject = payload;
            },
            SET_NOTE(state, payload) {
                if (checkDataChanged(state.document.note, payload)) {
                    state.isDataChanged = true;
                }
                state.document.note = payload;
            },

        }
        this.actions = {
            ...super.actions(),
            ...documentRegistrationActions(),
            setDocumentKind({ commit}, payload) {
                if (!payload) payload = docmentKindService.emptyDocumentKind();
                commit("SET_DOCUMENT_KIND", payload);
            },
            setSubject({ commit, dispatch }, payload) {
                commit("SET_SUBJECT", payload);
                dispatch("reevaluateDocumentName");
            },
            async reevaluateDocumentName({ state, commit }) {
                if (state.document.documentKind.generateDocumentName) {
                    const { data } = await this.$axios.post(
                        dataApi.documentModule.ReevaluateDocumentName,
                        state.document
                    );
                    commit("SET_NAME", data);
                }
            },
        }
    }
}