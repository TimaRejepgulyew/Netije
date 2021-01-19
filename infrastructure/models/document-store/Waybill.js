import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default class Waybill extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
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
      SET_COUNTERPART_SIGNATORY_ID(state, payload) {
        if (
          this._checkDataChanged(
            state.document.counterpartySignatoryId,
            payload
          )
        ) {
          state.isDataChanged = true;
          state.document.counterpartySignatoryId = payload;
        }
      },
      SET_TOTAL_AMOUNT(state, payload) {
        if (this._checkDataChanged(state.document.totalAmount, payload)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_CURRENCY_ID(state, payload) {
        if (this._checkDataChanged(state.document.currencyId, payload)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
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
      SET_OUR_SIGNATORY(state, payload) {
        if (
          this._checkDataAsObjectChanged(state.document.ourSignatory, payload)
        ) {
          state.isDataChanged = true;
          state.document.ourSignatory = payload;
        }
      },
      SET_CORRECTED(state, payload) {
        if (this._checkDataAsObjectChanged(state.document.corrected, payload)) {
          state.isDataChanged = true;
          state.document.corrected = payload;
        }
      },
      SET_RESPONSIBLE_EMPLOYEE(state, payload) {
        if (this._checkDataAsObjectChanged(state.document.responsibleEmployee, payload)) {
          state.isDataChanged = true;
          state.document.responsibleEmployee = payload;
        }
      },
      SET_LEADING_DOCUMENT(state, payload) {
        if (this._checkDataAsObjectChanged(state.document.leadingDocument, payload)) {
          state.isDataChanged = true;
          state.document.leadingDocument = payload;
        }
      },
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
