import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Memo extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,

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
      SET_ADDRESSE(state, payload) {
        if (this._checkDataAsObjectChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      SET_ASSIGNEE(state, payload) {
        if (checkDataChanged(state.document.assignee, payload)) {
          state.isDataChanged = true;
          state.document.assignee = payload;
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
      SET_PREPARED_BY(state, payload) {
        if (
          this._checkDataAsObjectChanged(state.document.preparedBy, payload)
        ) {
          state.isDataChanged = true;
          state.document.preparedBy = payload;
        }
      }
    };
    const actions = {
      ...options?.actions
    };
    super({ mutations, actions });
  }
}
