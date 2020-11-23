import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class IncomingTaxInvoice extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_IS_ADJUSTMENT(state, payload) {
        if (checkDataChanged(state.document.isAdjustment, payload)) {
          state.isDataChanged = true;
        }
        state.document.isAdjustment = payload;
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
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT_ID", payload?.id);
        commit("SET_LEADING_DOCUMENT", payload);
        dispatch("reevaluateDocumentName");
      },
      setCounterparty({ commit, dispatch }, payload) {
        commit("SET_COUNTERPARTY", payload);
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
      }
    };
    super({ mutations, actions });
  }
}
