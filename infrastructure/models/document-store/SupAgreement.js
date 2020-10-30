import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js"
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class SupAgreement extends ElectronicDocument {
    constructor(options) {
        const mutations = {
            ...options?.mutations,
            SET_LEADING_DOCUMENT_ID(state, payload) {
                if (checkDataChanged(state.document.leadingDocumentId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.leadingDocumentId = payload;
            },
            SET_COUNTERPARTY(state, payload) {
                if (checkDataChanged(state.document.counterpartyId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.counterpartyId = payload;
            },
            SET_CONTACT_ID(state, payload) {
                if (checkDataChanged(state.document.contactId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.contactId = payload;
            },
            SET_COUNTERPART_SIGNATORY_ID(state, payload) {
                if (checkDataChanged(state.document.counterpartySignatoryId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.counterpartySignatoryId = payload;
            },
            SET_CURRENCY_ID(state, payload) {
                if (checkDataChanged(state.document.currencyId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.currencyId = payload;
            },
            SET_TOTAL_AMOUNT(state, payload) {
                if (checkDataChanged(state.document.totalAmount, payload)) {
                    state.isDataChanged = true;
                }
                state.document.totalAmount = payload;
            },
            SET_VALID_TILL(state, payload) {
                if (checkDataChanged(state.document.validTill, payload)) {
                    state.isDataChanged = true;
                }
                state.document.validTill = payload;
            },
            SET_VALID_FROM(state, payload) {
                if (checkDataChanged(state.document.validFrom, payload)) {
                    state.isDataChanged = true;
                }
                state.document.validFrom = payload;
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
            SET_ADDRESSE_ID(state, payload) {
                if (checkDataChanged(state.document.addresseeId, payload)) {
                    state.isDataChanged = true;
                }
                state.document.addresseeId = payload;
            },
            SET_IS_STANDARD(state, payload) {
                if (checkDataChanged(state.document.isStandard, payload)) {
                    state.isDataChanged = true;
                }
                state.document.isStandard = payload;
            },
        }
        const actions = {
            ...options?.actions,
            setLeadingDocumentId({ commit, dispatch }, payload) {
                commit("SET_LEADING_DOCUMENT_ID", payload);
                dispatch("reevaluateDocumentName");
            },
            setCounterparty({ commit, dispatch }, payload) {
                commit("SET_COUNTERPARTY", payload);
                dispatch("reevaluateDocumentName");
            },
        }
        super({ mutations, actions })
    }
}