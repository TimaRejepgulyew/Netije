import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";

export default class OutgoingTaxInvoice extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_LEADING_DOCUMENT(state, payload) {
        if (
          this._checkDataAsObjectChanged(
            state.document.leadingDocument,
            payload
          )
        ) {
          state.isDataChanged = true;
          state.document.leadingDocument = payload;
        }
      },

      SET_ADDRESSE(state, payload) {
        if (this._checkDataAsObjectChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      SET_COUNTERPARTY(state, payload) {
        if (this._checkDataChanged(state.document.counterpartyId, payload)) {
          state.isDataChanged = true;
          state.document.counterpartyId = payload;
        }
      },
      SET_CONTACT_ID(state, payload) {
        if (this._checkDataChanged(state.document.contactId, payload)) {
          state.isDataChanged = true;
          state.document.contactId = payload;
        }
      },

      SET_CURRENCY_ID(state, payload) {
        if (this._checkDataChanged(state.document.currencyId, payload)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
        }
      },
      SET_TOTAL_AMOUNT(state, payload) {
        if (this._checkDataChanged(state.document.totalAmount, payload)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_VALID_FROM(state, payload) {
        if (this._checkDataChanged(state.document.validFrom, payload)) {
          state.isDataChanged = true;
          state.document.validFrom = payload;
        }
      },
      SET_VALID_TILL(state, payload) {
        if (this._checkDataChanged(state.document.validTill, payload)) {
          state.isDataChanged = true;
          state.document.validTill = payload;
        }
      },
      SET_BUSINESS_UNIT(state, payload) {
        if (
          this._checkDataAsObjectChanged(state.document.businessUnit, payload)
        ) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT(state, payload) {
        if (
          this._checkDataAsObjectChanged(state.document.department, payload)
        ) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_CORRECTED_ID(state, payload) {
        if (this._checkDataChanged(state.document.correctedId, payload)) {
          state.isDataChanged = true;
          state.document.correctedId = payload;
        }
      },
      SET_RESPONSIBLE_EMPLOYEE(state, payload) {
        if (
          this._checkDataAsObjectChanged(
            state.document.responsibleEmployee,
            payload
          )
        ) {
          state.isDataChanged = true;
          state.document.responsibleEmployee = payload;
        }
      },
      SET_IS_ADJUSTMENT(state, payload) {
        if (this._checkDataChanged(state.document.isAdjustment, payload)) {
          state.isDataChanged = true;
          state.document.isAdjustment = payload;
        }
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
      }
    };
    super({ mutations, actions });
  }
}
