import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Addendum extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_LEADING_DOCUMENT:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(
            payload,
            state.document.leadingDocument
          )
        ) {
          state.isDataChanged = true;
          state.document.leadingDocument = payload;
        }
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions });
  }
}
