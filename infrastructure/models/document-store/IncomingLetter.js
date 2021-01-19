import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default class IncomingLetter extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_CORRESPONDENT_ID: (state, payload) => {
        if (this._checkDataChanged(state.document.correspondentId, payload)) {
          state.isDataChanged = true;
          state.document.correspondentId = payload;
        }
      },
      SET_CONTACT_ID: (state, payload) => {
        if (this._checkDataChanged(state.document.contactId, payload)) {
          state.isDataChanged = true;
          state.document.contactId = payload;
        }
      },
      SET_COUNTERPART_SIGNATORY_ID: (state, payload) => {
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
      SET_DELIVERY_METHOD_ID: (state, payload) => {
        if (this._checkDataChanged(state.document.deliveryMethodId, payload)) {
          state.isDataChanged = true;
          state.document.deliveryMethodId = payload;
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
        if (
          this._checkDataAsObjectChanged(state.document.department, payload)
        ) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_ADDRESSE: (state, payload) => {
        if (this._checkDataAsObjectChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      IN_RESPONSE: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(state.document.inResponseTo, payload)
        ) {
          state.isDataChanged = true;
          state.document.inResponseTo = payload;
        }
      },
      IN_NUMBER: (state, payload) => {
        if (this._checkDataChanged(state.document.inNumber, payload)) {
          state.isDataChanged = true;
          state.document.inNumber = payload;
        }
      },
      DATED: (state, payload) => {
        if (this._checkDataChanged(state.document.dated, payload)) {
          state.isDataChanged = true;
          state.document.dated = payload;
        }
      },
      SET_ASSIGNEE: (state, payload) => {
        if (this._checkDataAsObjectChanged(state.document.assignee, payload)) {
          state.isDataChanged = true;
          state.document.assignee = payload;
        }
      },
      IN_RESPONSE_TO: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(state.document.inResponseTo, payload)
        ) {
          state.isDataChanged = true;
          state.document.inResponseTo = payload;
        }
      }
    };
    const actions = {
      ...options?.actions,
      setCorrespondent({ commit, dispatch }, payload) {
        commit("SET_CORRESPONDENT_ID", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions });
  }
}
