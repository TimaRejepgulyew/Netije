import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Waybill extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
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
      SET_TOTAL_AMOUNT(state, payload) {
        if (checkDataChanged(state.document.totalAmount, payload)) {
          state.isDataChanged = true;
        }
        state.document.totalAmount = payload;
      },
      SET_CURRENCY_ID(state, payload) {
        if (checkDataChanged(state.document.currencyId, payload)) {
          state.isDataChanged = true;
        }
        state.document.currencyId = payload;
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
      SET_OUR_SIGNATORY_ID(state, payload) {
        if (checkDataChanged(state.document.ourSignatoryId, payload)) {
          state.isDataChanged = true;
        }
        state.document.ourSignatoryId = payload;
      },
      SET_CORRECTED_ID(state, payload) {
        if (checkDataChanged(state.document.correctedId, payload)) {
          state.isDataChanged = true;
        }
        state.document.correctedId = payload;
      },
      SET_RESPONSIBLE_EMPLOYEE_ID(state, payload) {
        if (checkDataChanged(state.document.responsibleEmployeeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.responsibleEmployeeId = payload;
      },
      SET_LEADING_DOCUMENT_ID(state, payload) {
        if (checkDataChanged(state.document.leadingDocumentId, payload)) {
          state.isDataChanged = true;
        }
        state.document.leadingDocumentId = payload;
      },
      SET_LEADING_DOCUMENT(state, payload) {
        if (checkDataChanged(state.document.leadingDocument?.id, payload)) {
          state.isDataChanged = true;
        }
        state.document.leadingDocument = payload;
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT", payload);
        commit("SET_LEADING_DOCUMENT_ID", payload?.id);
        dispatch("reevaluateDocumentName");
      },
      setCounterparty({ commit, dispatch }, payload) {
        commit("SET_COUNTERPARTY", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions });
  }
}
