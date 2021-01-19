import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default class PowerOfAttorney extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_PREPARED_BY: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(state.document.preparedBy, payload)
        ) {
          state.isDataChanged = true;
          state.document.preparedBy = payload;
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
      SET_VALID_TILL: (state, payload) => {
        if (this._checkDataChanged(state.document.validTill, payload)) {
          state.isDataChanged = true;
          state.document.validTill = payload;
        }
      },
      SET_ISSUED_TO: (state, payload) => {
        if (this._checkDataAsObjectChanged(state.document.issuedTo, payload)) {
          state.isDataChanged = true;
          state.document.issuedTo = payload;
        }
      },
      SET_OUR_SIGNATORY: (state, payload) => {
        if (
          this._checkDataAsObjectChanged(state.document.ourSignatory, payload)
        ) {
          state.isDataChanged = true;
          state.document.ourSignatory = payload;
        }
      }
    };
    const actions = {
      ...options?.actions
    };
    super({ mutations, actions });
  }
}
