import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import generateDocumentName from "~/infrastructure/services/documentNameGenerator";
import documentFactory from "~/infrastructure/factory/documentFactory.js";
export const state = () => ({
  currentDocument: {
    name: null,
    subject: null
  },
  currentUrl: null,
  isDataChanged: false,
  readOnly: false,
  canUpdate: false,
  canDelete: false,
  canRegister: false,
  isRegistered: false,
  selectedDocumentNumberingType: null
});

export const getters = {
  document({ currentDocument }) {
    return currentDocument;
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
  }
};
export const mutations = {
  BIND_FIELDS(state, documentType) {
    state.currentDocument = documentFactory(documentType);
  },
  SET_DOCUMENT_KIND(state, payload) {
    state.currentDocument.documentKind = payload;
  },
  SET_NAME(state, payload) {
    state.currentDocument.name = payload;
  },
  SET_SUBJECT(state, payload) {
    state.currentDocument.subject = payload;
  },
  SET_NOTE(state, payload) {
    state.currentDocument.note = payload;
  },
  SET_CORRESPONDENT(state, payload) {
    state.currentDocument.correspondent = payload;
  },
  SET_CONTACT_ID(state, payload) {
    state.currentDocument.contactId = payload;
  },
  SET_COUNTERPART_SIGNATORY_ID(state, payload) {
    state.currentDocument.counterpartySignatoryId = payload;
  },
  SET_DELIVERY_METHOD_ID(state, payload) {
    state.currentDocument.deliveryMethodId = payload;
  },
  SET_BUSINESS_UNIT_ID(state, payload) {
    state.currentDocument.businessUnitId = payload;
  },
  SET_DEPARTMENT_ID(state, payload) {
    state.currentDocument.departmentId = payload;
  },
  SET_ADDRESSE_ID(state, payload) {
    state.currentDocument.addresseeId = payload;
  },
  IN_RESPONSE_TO_ID(state, payload) {
    state.currentDocument.inResponseToId = payload;
  },
  SET_ADDRESSE_ID(state, payload) {
    state.currentDocument.addresseeId = payload;
  },
  IN_NUMBER(state, payload) {
    state.currentDocument.inNumber = payload;
  },
  DATED(state, payload) {
    state.currentDocument.dated = payload;
  },
  CURRENT_URL(state, payload) {
    state.currentUrl = payload;
  },
  SET_DOCUMENT_STATE(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  SET_OUR_SIGNATORY_ID(state, payload) {
    state.currentDocument.ourSignatoryId = payload;
  },
  SET_PREPARED_BY_ID(state, payload) {
    state.currentDocument.preparedById = payload;
  },
  SET_DOCUMENT_ID(state, payload) {
    state.currentDocument.id = payload;
  },
  SET_DOCUMENT_TYPE(state, payload) {
    state.currentDocument.documentType = payload;
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
export const actions = {
  async createDocument({ state, commit }) {
    const document = state.currentDocument;
    document.documentKindId = document.documentKind.id;
    if (document.correspondent) {
      document.correspondentId = document.correspondent.id;
    }
    const res = await this.$axios.post(state.currentUrl, document);
    commit("SET_DOCUMENT_ID", res.data);
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
    if (state.currentDocument.documentKind) {
      if (state.currentDocument.documentKind.generateDocumentName) {
        const name = generateDocumentName(this, state.currentDocument);
        commit("SET_NAME", name);
      }
    }
  },
  async initNewDocument({ dispatch, commit }, documentType) {
    commit("BIND_FIELDS", documentType);
    const defaultDocKind = await docmentKindService.getDefaultDocumentKind(
      this,
      documentType
    );
    commit("SET_DOCUMENT_KIND", defaultDocKind);
    commit("SET_DOCUMENT_TYPE", documentType);
    dispatch("reevaluateDocumentName");
  }
};
