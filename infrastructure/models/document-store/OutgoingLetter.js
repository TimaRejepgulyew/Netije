import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import dataApi from "~/static/dataApi";
export default class OutgoingLetter extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_OUR_SIGNATORY:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(state.document.ourSignatory, payload)
        ) {
          state.isDataChanged = true;
          state.document.ourSignatory = payload;
        }
      },
      SET_CORRESPONDENT_ID:(state, payload)=> {
        if (this._checkDataChanged(state.document.correspondentId, payload)) {
          state.isDataChanged = true;
          state.document.correspondentId = payload;
        }
      },
      SET_CORRESPONDENT:(state, payload)=> {
        state.correspondent = payload;
      },
      SET_DELIVERY_METHOD_ID:(state, payload)=> {
        if (this._checkDataChanged(state.document.deliveryMethodId, payload)) {
          state.isDataChanged = true;
          state.document.deliveryMethodId = payload;
        }
      },
      SET_BUSINESS_UNIT:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(state.document.businessUnit, payload)
        ) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(state.document.department, payload)
        ) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_PREPARED_BY:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(state.document.preparedBy, payload)
        ) {
          state.isDataChanged = true;
          state.document.preparedBy = payload;
        }
      },
      IN_RESPONSE_TO:(state, payload)=> {
        if (this._checkDataAsObjectChanged(state.document.inResponseTo, payload)) {
          state.isDataChanged = true;
          state.document.inResponseTo = payload;
        }
      },
      SET_ADDRESSE:(state, payload)=> {
        if (this._checkDataAsObjectChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      SET_CAN_EXCHANGE:(state, payload)=> {
        state.canExchange = payload;
      },
      SET_EXCHANGED:(state, payload)=> {
        state.document.exchanged = payload;
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
