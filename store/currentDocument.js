import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import generateDocumentName from "~/infrastructure/services/documentNameGenerator";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
function checkDataChanged(oldValue, newValue) {
  if (oldValue !== newValue) console.log(oldValue, newValue);
  return oldValue !== newValue;
}
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
  isNew: false,
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
  isRegistered({ document }) {
    return document.registrationState == RegistrationState.Registered;
  },
  readOnly({ readOnly }) {
    return readOnly;
  },
  isDataChanged({ isDataChanged }) {
    return isDataChanged;
  },
  isNew({ isNew }) {
    return isNew;
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
  SET_HAS_VERSIONS(state) {
    state.document.hasVersions = true;
  },
  CLEAR_REGISTRATION_DATA(state) {
    state.document.documentRegisterId = null;
    state.document.registrationDate = null;
    state.document.registrationNumber = null;
  },
  SET_DOCUMENT_KIND(state, payload) {
    if (checkDataChanged(state.document.documentKindId, payload.id)) {
      state.isDataChanged = true;
    }
    state.document.documentKind = payload;
    if (payload) state.document.documentKindId = payload.id;
    else state.document.documentKindId = null;
  },
  SET_NAME(state, payload) {
    if (checkDataChanged(state.document.name, payload)) {
      state.isDataChanged = true;
    }
    state.document.name = payload;
  },
  SET_DEFAULT_NAME(state, payload) {
    state.document.name = payload;
  },
  SET_IS_NEW(state, payload) {
    state.isNew = payload;
  },
  SET_SUBJECT(state, payload) {
    if (checkDataChanged(state.document.subject, payload)) {
      state.isDataChanged = true;
    }
    state.document.subject = payload;
  },
  SET_NOTE(state, payload) {
    if (checkDataChanged(state.document.note, payload)) {
      state.isDataChanged = true;
    }
    state.document.note = payload;
  },
  SET_CORRESPONDENT(state, payload) {
    if (checkDataChanged(state.document.correspondentId, payload.id)) {
      state.isDataChanged = true;
    }
    state.document.correspondent = payload;
    state.document.correspondentId = payload.id;
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

  SET_CASE_FILE_ID(state, payload) {
    if (checkDataChanged(state.document.caseFileId, payload)) {
      state.isDataChanged = true;
    }
    state.document.caseFileId = payload;
  },
  SET_PLACE_TO_CASE_FILE_DATE_ID(state, payload) {
    if (checkDataChanged(state.document.placedToCaseFileDate, payload)) {
      state.isDataChanged = true;
    }
    state.document.placedToCaseFileDate = payload;
  },
  SET_DOCUMENT(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  SET_OUR_SIGNATORY_ID(state, payload) {
    if (checkDataChanged(state.document.ourSignatoryId, payload)) {
      state.isDataChanged = true;
    }
    state.document.ourSignatoryId = payload;
  },
  SET_PREPARED_BY_ID(state, payload) {
    if (checkDataChanged(state.document.preparedById, payload)) {
      state.isDataChanged = true;
    }
    state.document.preparedById = payload;
  },
  SET_ASSIGNEE_ID(state, payload) {
    if (checkDataChanged(state.document.assigneeId, payload)) {
      state.isDataChanged = true;
    }
    state.document.assigneeId = payload;
  },
  SET_LEADING_DOCUMENT_ID(state, payload) {
    if (checkDataChanged(state.document.leadingDocumentId, payload)) {
      state.isDataChanged = true;
    }
    console.log(payload);
    state.document.leadingDocumentId = payload;
  },
  SET_ISSUED_TO_ID(state, payload) {
    if (checkDataChanged(state.document.issuedToId, payload)) {
      state.isDataChanged = true;
    }
    state.document.issuedToId = payload;
  },
  SET_VALID_TILL(state, payload) {
    if (checkDataChanged(state.document.validTill, payload)) {
      state.isDataChanged = true;
    }
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
  async save({ dispatch, getters, commit, state }) {
    const document = JSON.stringify(state.document);
    const res = await this.$axios.put(
      dataApi.paperWork.Documents + state.document.id,
      {
        documentJson: document,
        documentTypeGuid: state.document.documentTypeGuid
      }
    );
    dispatch("loadDocument", res.data);
    commit("DATA_CHANGED", false);
    commit("SET_IS_NEW", false);
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
        commit("SET_DEFAULT_NAME", name);
      }
    }
  },
  loadDocument({ commit }, payload) {
    payload.document.documentKind = {
      id: payload.document.documentKindId,
      name: null
    };

    payload.document.correspondent = {
      id: payload.document.correspondentId,
      name: null
    };

    commit("IS_REGISTERED", payload.document.registrationState);
    commit("SET_DOCUMENT", payload);
  },
  async getDocumentById({ dispatch, commit, state }, { type, id }) {
    if (state.isNew) return;
    const { data } = await this.$axios.get(
      dataApi.paperWork.Documents + `${type}/${id}`
    );
    dispatch("loadDocument", data);
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
  async initNewDocument({ dispatch, commit }, params) {
    const { data } = await this.$axios.post(
      dataApi.paperWork.Documents,
      params
    );
    console.log(data);
    commit("SET_IS_NEW", true);
    dispatch("loadDocument", data);
    commit("DATA_CHANGED", true);
  }
};
