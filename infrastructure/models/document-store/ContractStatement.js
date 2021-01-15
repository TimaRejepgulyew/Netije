import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class ContractStatement extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
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
      SET_OUR_SIGNATORY(state, payload) {
        if (checkDataChanged(state.document.ourSignatory.id, payload.id)) {
          state.isDataChanged = true;
        }
        state.document.ourSignatory = payload;
      },
      SET_RESPONSIBLE_EMPLOYEE(state, payload) {
        if (checkDataChanged(state.document.responsibleEmployee, payload)) {
          state.isDataChanged = true;
        }
        state.document.responsibleEmployee = payload;
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
      SET_VALID_FROM(state, payload) {
        if (checkDataChanged(state.document.validFrom, payload)) {
          state.isDataChanged = true;
        }
        state.document.validFrom = payload;
      },
      SET_VALID_TILL(state, payload) {
        if (checkDataChanged(state.document.validTill, payload)) {
          state.isDataChanged = true;
        }
        state.document.validTill = payload;
      },
      SET_BUSINESS_UNIT(state, payload) {
        if (checkDataChanged(state.document.businessUnit, payload)) {
          state.isDataChanged = true;
        }
        state.document.businessUnit = payload;
      },
      SET_DEPARTMENT_ID(state, payload) {
        if (checkDataChanged(state.document.department, payload)) {
          state.isDataChanged = true;
        }
        state.document.department = payload;
      },
      SET_ADDRESSE_ID(state, payload) {
        if (checkDataChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
        }
        state.document.addressee = payload;
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
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
