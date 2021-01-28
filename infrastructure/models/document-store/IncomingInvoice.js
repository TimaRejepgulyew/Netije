import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default class IncomingInvoice extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      NUMBER: (state, payload) => {
        if (this._checkDataChanged(state.document.number, payload)) {
          state.isDataChanged = true;
          state.document.number = payload;
        }
      },
      SET_LEADING_DOCUMENT: (state, payload) => {
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
      SET_COUNTERPARTY: (state, payload) => {
        if (this._checkDataChanged(state.document.counterpartyId, payload)) {
          state.isDataChanged = true;
          state.document.counterpartyId = payload;
        }
      },
      SET_CURRENCY_ID: (state, payload) => {
        if (this._checkDataChanged(state.document.currencyId, payload)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
        }
      },
      SET_TOTAL_AMOUNT: (state, payload) => {
        if (this._checkDataChanged(state.document.totalAmount, payload)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_BUSINESS_UNIT: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(state.document.businessUnit, payload)
        ) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT: (state, payload) => {
        if (this._checkDataChanged(state.document.department, payload)) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      DATE: (state, payload) => {
        if (this._checkDataChanged(state.document.date, payload)) {
          state.isDataChanged = true;
          state.document.date = payload;
        }
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT", payload);
      },
      setCounterparty({ commit, dispatch }, payload) {
        commit("SET_COUNTERPARTY", payload);
      }
    };
    super({ mutations, actions });
  }
}
