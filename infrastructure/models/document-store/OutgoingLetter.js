import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
import dataApi from "~/static/dataApi";
export default class OutgoingLetter extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_OUR_SIGNATORY_ID(state, payload) {
        if (checkDataChanged(state.document.ourSignatoryId, payload)) {
          state.isDataChanged = true;
        }
        state.document.ourSignatoryId = payload;
      },
      SET_CORRESPONDENT_ID(state, payload) {
        if (checkDataChanged(state.document.correspondentId, payload)) {
          state.isDataChanged = true;
          state.document.correspondentId = payload;
        }
      },
      SET_CORRESPONDENT(state, payload) {
        state.correspondent = payload;
      },
      SET_DELIVERY_METHOD_ID(state, payload) {
        if (checkDataChanged(state.document.deliveryMethodId, payload)) {
          state.isDataChanged = true;
          state.document.deliveryMethodId = payload;
        }
      },
      SET_BUSINESS_UNIT_ID(state, payload) {
        if (checkDataChanged(state.document.businessUnitId, payload)) {
          state.isDataChanged = true;
          state.document.businessUnitId = payload;
        }
      },
      SET_DEPARTMENT_ID(state, payload) {
        if (checkDataChanged(state.document.departmentId, payload)) {
          state.isDataChanged = true;
          state.document.departmentId = payload;
        }
      },
      SET_PREPARED_BY_ID(state, payload) {
        if (checkDataChanged(state.document.preparedById, payload)) {
          state.isDataChanged = true;
          state.document.preparedById = payload;
        }
      },
      IN_RESPONSE_TO(state, payload) {
        if (checkDataChanged(state.document.inResponseTo?.id, payload?.id)) {
          state.isDataChanged = true;
          state.document.inResponseTo = payload;
        }
      },
      IN_RESPONSE_TO_ID(state, payload) {
        if (checkDataChanged(state.document.inResponseToId, payload)) {
          state.isDataChanged = true;
          state.document.inResponseToId = payload;
        }
      },
      SET_ADDRESSE_ID(state, payload) {
        if (checkDataChanged(state.document.addresseeId, payload)) {
          state.isDataChanged = true;
          state.document.addresseeId = payload;
        }
      },
      SET_CAN_EXCHANGE(state, payload) {
        state.canExchange = payload;
      }
    };
    const state = {
      ...options?.state,
      correspondent: null
    };
    const getters = {
      ...options?.getters,
      correspondent({ correspondent }) {
        return correspondent;
      }
    };
    const actions = {
      ...options?.actions,
      async updateExchange(
        { state, commit },
        { documentTypeGuid, documentId }
      ) {
        const { data } = await this.$axios.get(
          `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`
        );
        commit("SET_CAN_EXCHANGE", data.canExchange);
      },
      setCorrespondent({ commit, dispatch }, payload) {
        commit("SET_CORRESPONDENT_ID", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions, state, getters });
  }
}
