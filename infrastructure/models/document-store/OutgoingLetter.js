import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class OutgoingLetter extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_CORRESPONDENT_ID(state, payload) {
        if (checkDataChanged(state.document.correspondentId, payload)) {
          state.isDataChanged = true;
        }
        state.document.correspondentId = payload;
      },
      SET_DELIVERY_METHOD_ID(state, payload) {
        if (checkDataChanged(state.document.deliveryMethodId, payload)) {
          state.isDataChanged = true;
        }
        state.document.deliveryMethodId = payload;
      },
      SET_BUSINESS_UNIT_ID(state, payload) {
        if (checkDataChanged(state.document.businessUnitId, payload)) {
          state.isDataChanged = true;
        }
        state.document.businessUnitId = payload;
      },
      SET_DEPARTMENT_ID(state, payload) {
        if (checkDataChanged(state.document.departmentId, payload)) {
          state.isDataChanged = true;
        }
        state.document.departmentId = payload;
      },
      SET_PREPARED_BY_ID(state, payload) {
        if (checkDataChanged(state.document.preparedById, payload)) {
          state.isDataChanged = true;
        }
        state.document.preparedById = payload;
      },
      IN_RESPONSE_TO(state, payload) {
        if (checkDataChanged(state.document.inResponseTo?.id, payload?.id)) {
          state.isDataChanged = true;
        }
        state.document.inResponseTo = payload;
      },
      IN_RESPONSE_TO_ID(state, payload) {
        if (checkDataChanged(state.document.inResponseToId, payload)) {
          state.isDataChanged = true;
        }
        state.document.inResponseToId = payload;
      },
      SET_ADDRESSE_ID(state, payload) {
        if (checkDataChanged(state.document.addresseeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.addresseeId = payload;
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
