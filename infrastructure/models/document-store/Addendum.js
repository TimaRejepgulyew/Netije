import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Addendum extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_LEADING_DOCUMENT_ID(state, payload) {
        if (checkDataChanged(state.document.leadingDocumentId, payload)) {
          state.isDataChanged = true;
        }
        state.document.leadingDocumentId = payload;
      },
      SET_LEADING_DOCUMENT(state, payload) {
        state.document.leadingDocument = payload;
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocumentId({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT_ID", payload?.id);
        commit("SET_LEADING_DOCUMENT", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions });
  }
}
