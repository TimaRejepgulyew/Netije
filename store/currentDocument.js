import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import generateDocumentName from "~/infrastructure/services/documentNameGenerator";
import documentFactory from "~/infrastructure/factory/documentFactory.js";
import dataApi from "~/static/dataApi";
export const state = () => ({
  form: null,
  document: {
    name: null,
    subject: null,
    documentKind: {
      autoNumbering: false,
      id: null,
      availableActions: [],
      generateDocumentName: false,
      isDefault: false,
      numberingType: null
    }
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
      documentRegisterId: document.documentRegisterId
    };
    console.log(regDate);
    return regDate;
  }
};
export const mutations = {
  BIND_FIELDS(state, documentType) {
    state.document = documentFactory(documentType);
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
  CURRENT_URL(state, payload) {
    state.currentUrl = payload;
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
  SET_FORM(state, payload) {
    state.form = payload;
  },
  SET_PREPARED_BY_ID(state, payload) {
    state.document.preparedById = payload;
  },
  SET_ASSIGNEE_ID(state, payload) {
    state.document.assigneeId = payload;
  },
  SET_DOCUMENT_ID(state, payload) {
    state.document.id = payload;
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
  SET_DOCUMENT_TYPE(state, payload) {
    state.document.documentType = payload;
  },
  SET_REGISTRATION_NUMBER(state, payload) {
    state.document.registrationNumber = payload;
  },
  SET_REGISTRATION_DATE(state, payload) {
    state.document.registrationDate = payload;
  },
  SET_DOCUMENT_REGISTER_ID(state, payload) {
    state.document.documentRegisterId = payload;
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
export const actions = {
  async save({ state }) {
    console.log(state.form(),"dawdawd");
    if (state.form().isValid)
      await this.$axios.put(
        state.currentUrl + state.document.id,
        state.document
      );
  },
  async createDocument({ state, commit }) {
    const document = state.document;
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
    if (state.document.documentKind) {
      if (state.document.documentKind.generateDocumentName) {
        const name = generateDocumentName(this, state.document);
        commit("SET_NAME", name);
      }
    }
  },
  async getDocumentById({ commit, state }, id) {
    const { data } = await this.$axios.get(
      dataApi.paperWork.GetDocumentById + id
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
    commit("SET_DOCUMENT", data);
  },
  async registration({ getters }, isCustomNumber) {
    await this.$axios.post(
      dataApi.documentRegistration.RegisterDocument,
      getters["registrationData"]
    );
  },
  async initNewDocument({ dispatch, commit }, documentType) {
    commit("BIND_FIELDS", documentType);
    const defaultDocKind = await docmentKindService.getDefaultDocumentKind(
      this,
      documentType
    );
    commit("SET_DOCUMENT_KIND", defaultDocKind);
    commit("SET_DOCUMENT_TYPE", documentType);
  }
};
