import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import generateDocumentName from "~/infrastructure/services/documentNameGenerator";
import documentFactory from "~/infrastructure/factory/documentFactory.js";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
export const state = () => ({
  document: {
    name: null,
    subject: null,
    documentKindId: null,
    documentKind: {
      autoNumbering: false,
      id: null,
      availableActions: [],
      generateDocumentName: false,
      isDefault: false,
      numberingType: null
    }
  },
  isDataChanged: false,
  readOnly: false,
  canUpdate: false,
  canDelete: false,
  canRegister: false,
  isRegistered: false,
  selectedDocumentNumberingType: null
});

export const getters = {
  document({ document }) {
    return document;
  },
  canRegister({ canRegister, selectedDocumentNumberingType }) {
    return (
      canRegister && selectedDocumentNumberingType != NumberingType.NotNumerable
    );
  },
  isRegistrable({ selectedDocumentNumberingType }) {
    return selectedDocumentNumberingType != NumberingType.NotNumerable;
  },
  canUpdate({ canUpdate }) {
    return canUpdate;
  },
  canDelete({ canDelete }) {
    return canDelete;
  },
  isRegistered({ isRegistered }) {
    return isRegistered;
  },
  readOnly({ readOnly }) {
    return readOnly;
  },
  isDataChanged({ isDataChanged }) {
    return isDataChanged;
  },
  registrationData({ document }) {
    const regDate = {
      documentId: document.id,
      isCustomNumber: document.isCustomNumber,
      registrationDate: document.registrationDate,
      registrationNumber: document.registrationNumber,
      documentRegisterId: document.documentRegisterId,
      documentTypeGuid: document.documentTypeGuid
    };
    return regDate;
  }
};
export const mutations = {
  CLAER_REGISTRATION_DATA(state) {
    state.documentRegisterId = null;
    state.document.registrationData = null;
    state.document.registrationNumber = null;
  },
  SET_DOCUMENT_KIND(state, payload) {
    state.document.documentKind = payload;
    if (payload) state.document.documentKindId = payload.id;
    else state.document.documentKindId = null;
  },
  SET_NAME(state, payload) {
    state.document.name = payload;
  },
  SET_SUBJECT(state, payload) {
    state.document.subject = payload;
  },
  SET_NOTE(state, payload) {
    state.document.note = payload;
  },
  SET_CORRESPONDENT(state, payload) {
    state.document.correspondent = payload;
    state.document.correspondentId = payload.id;
  },
  SET_CONTACT_ID(state, payload) {
    state.document.contactId = payload;
  },
  SET_COUNTERPART_SIGNATORY_ID(state, payload) {
    state.document.counterpartySignatoryId = payload;
  },
  SET_DELIVERY_METHOD_ID(state, payload) {
    state.document.deliveryMethodId = payload;
  },
  SET_BUSINESS_UNIT_ID(state, payload) {
    state.document.businessUnitId = payload;
  },
  SET_DEPARTMENT_ID(state, payload) {
    state.document.departmentId = payload;
  },
  SET_ADDRESSE_ID(state, payload) {
    state.document.addresseeId = payload;
  },
  IN_RESPONSE_TO_ID(state, payload) {
    state.document.inResponseToId = payload;
  },
  SET_ADDRESSE_ID(state, payload) {
    state.document.addresseeId = payload;
  },
  IN_NUMBER(state, payload) {
    state.document.inNumber = payload;
  },
  DATED(state, payload) {
    state.document.dated = payload;
  },

  SET_CASE_FILE_ID(state, payload) {
    state.document.caseFileId = payload;
  },
  SET_PLACE_TO_CASE_FILE_DATE_ID(state, payload) {
    state.document.placedToCaseFileDate = payload;
  },
  SET_DOCUMENT(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  SET_OUR_SIGNATORY_ID(state, payload) {
    state.document.ourSignatoryId = payload;
  },
  SET_PREPARED_BY_ID(state, payload) {
    state.document.preparedById = payload;
  },
  SET_ASSIGNEE_ID(state, payload) {
    state.document.assigneeId = payload;
  },
  SET_LEADING_DOCUMENT_ID(state, payload) {
    state.document.leadingDocumentId = payload;
  },
  SET_ISSUED_TO_ID(state, payload) {
    state.document.issuedToId = payload;
  },
  SET_VALID_TILL(state, payload) {
    state.document.validTill = payload;
  },
  SET_REGISTRATION_NUMBER(state, payload) {
    state.document.registrationNumber = "" + payload;
  },
  SET_REGISTRATION_DATE(state, payload) {
    state.document.registrationDate = payload;
  },
  SET_DOCUMENT_REGISTER_ID(state, payload) {
    state.document.documentRegisterId = payload;
  },
  IS_REGISTERED(state, payload) {
    state.isRegistered = payload === RegistrationState.Registered;
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
export const actions = {
  async save({ getters, state }) {
    const document = JSON.stringify(state.document);
    await this.$axios.put(dataApi.paperWork.Documents + state.document.id, {
      documentJson: document,
      documentTypeGuid: state.document.documentTypeGuid
    });
  },
  setDocumentKind({ commit, dispatch }, payload) {
    if (!payload) payload = docmentKindService.emptyDocumentKind();
    commit("SET_DOCUMENT_KIND", payload);
    dispatch("reevaluateDocumentName");
  },
  setSubject({ commit, dispatch }, payload) {
    commit("SET_SUBJECT", payload);
    dispatch("reevaluateDocumentName");
  },
  setCorrespondent({ commit, dispatch }, payload) {
    if (!payload) payload = { name: null, id: null };
    commit("SET_CORRESPONDENT", payload);
    dispatch("reevaluateDocumentName");
  },
  reevaluateDocumentName({ state, commit }) {
    if (state.document.documentKind) {
      if (state.document.documentKind.generateDocumentName) {
        const name = generateDocumentName(this, state.document);
        commit("SET_NAME", name);
      }
    }
  },
  async getDocumentById({ commit, state }, { type, id }) {
    const { data } = await this.$axios.get(
      dataApi.paperWork.Documents + `${type}/${id}`
    );
    data.document.documentKind = {
      id: data.document.documentKindId,
      name: null
    };

    if (data.document.correspondentId) {
      data.document.correspondent = {
        id: data.document.correspondentId,
        name: null
      };
    }
    commit("IS_REGISTERED", data.document.registrationState);
    commit("SET_DOCUMENT", data);
  },
  async registration({ state, getters, dispatch, commit }, isCustomNumber) {
    const res = await this.$axios.post(
      dataApi.documentRegistration.RegisterDocument,
      getters["registrationData"]
    );
    await dispatch("getDocumentById", {
      type: state.document.documentTypeGuid,
      id: state.document.id
    });
  },
  async unRegister({ dispatch, state }) {
    await this.$axios.post(dataApi.documentRegistration.UnregisterDocument, {
      documentTypeGuid: state.document.documentTypeGuid,
      documentId: state.document.id
    });
    await dispatch("getDocumentById", {
      type: state.document.documentTypeGuid,
      id: state.document.id
    });
  },
  async initNewDocument({ dispatch, commit }, documentType) {
    const { data } = await this.$axios.post(dataApi.paperWork.Documents, {
      documentType
    });
    console.log(data);
    data.document.documentKind = {
      id: data.document.documentKindId,
      name: null
    };

    data.document.correspondent = {
      id: data.document.correspondentId,
      name: null
    };

    commit("SET_DOCUMENT", data);
  }
};
