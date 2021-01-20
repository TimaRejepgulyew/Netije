import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default class ContractStatement extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_LEADING_DOCUMENT: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(
            payload,
            state.document.leadingDocument
          )
        ) {
          state.isDataChanged = true;
          state.document.leadingDocument = payload;
        }
      },
      SET_COUNTERPARTY: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.counterpartyId)) {
          state.isDataChanged = true;
          state.document.counterpartyId = payload;
        }
      },
      SET_CONTACT_ID: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.contactId)) {
          state.isDataChanged = true;
          state.document.contactId = payload;
        }
      },
      SET_COUNTERPART_SIGNATORY_ID: (state, payload) => {
        if (
          this._checkDataChanged(
            payload,
            state.document.counterpartySignatoryId
          )
        ) {
          state.isDataChanged = true;
          state.document.counterpartySignatoryId = payload;
        }
      },
      SET_OUR_SIGNATORY: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(payload, state.document.ourSignatory)
        ) {
          state.isDataChanged = true;
          state.document.ourSignatory = payload;
        }
      },
      SET_RESPONSIBLE_EMPLOYEE: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(
            payload,
            state.document.responsibleEmployee
          )
        ) {
          state.isDataChanged = true;
          state.document.responsibleEmployee = payload;
        }
      },
      SET_CURRENCY_ID: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.currencyId)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
        }
      },
      SET_TOTAL_AMOUNT: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.totalAmount)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_VALID_FROM: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.validFrom)) {
          state.isDataChanged = true;
          state.document.validFrom = payload;
        }
      },
      SET_VALID_TILL: (state, payload) => {
        if (this._checkDataChanged(payload, state.document.validTill)) {
          state.isDataChanged = true;
          state.document.validTill = payload;
        }
      },
      SET_BUSINESS_UNIT: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(payload, state.document.businessUnit)
        ) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(payload, state.document.department)
        ) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_ADDRESSE: (state, payload) => {
        if (this._checkDataAsObjectChanged(payload, state.document.addressee)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
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
      },
    };
    super({ mutations, actions });
  }
}
