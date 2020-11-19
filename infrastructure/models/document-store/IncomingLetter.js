import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class IncomingLetter extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_CORRESPONDENT_ID(state, payload) {
        if (checkDataChanged(state.document.correspondentId, payload)) {
          state.isDataChanged = true;
        }
        state.document.correspondentId = payload;
      },
      SET_CONTACT_ID(state, payload) {
        if (checkDataChanged(state.document.contactId, payload)) {
          state.isDataChanged = true;
        }
        state.document.contactId = payload;
      },
      SET_COUNTERPART_SIGNATORY_ID(state, payload) {
        if (checkDataChanged(state.document.counterpartySignatoryId, payload)) {
          state.isDataChanged = true;
        }
        state.document.counterpartySignatoryId = payload;
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
      SET_ADDRESSE_ID(state, payload) {
        if (checkDataChanged(state.document.addresseeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.addresseeId = payload;
      },
      IN_RESPONSE_TO_ID(state, payload) {
        if (checkDataChanged(state.document.inResponseToId, payload)) {
          state.isDataChanged = true;
        }
        state.document.inResponseToId = payload;
      },
      IN_RESPONSE_TO(state, payload) {
        if (checkDataChanged(state.document.inResponseTo?.id, payload?.id)) {
          state.isDataChanged = true;
        }
        state.document.inResponseTo = payload;
      },
      IN_NUMBER(state, payload) {
        if (checkDataChanged(state.document.inNumber, payload)) {
          state.isDataChanged = true;
        }
        state.document.inNumber = payload;
      },
      DATED(state, payload) {
        if (checkDataChanged(state.document.dated, payload)) {
          state.isDataChanged = true;
        }
        state.document.dated = payload;
      },
      SET_ASSIGNEE_ID(state, payload) {
        if (checkDataChanged(state.document.assigneeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.assigneeId = payload;
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
