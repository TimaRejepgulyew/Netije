import moment from "moment";
export const state = () => ({
  name: "",
  subject: "",
  dated: "",
  documentKind: {},
  documentId: 1
});

export const getters = {
  mainFormProperties({ name, subject, documentKind }) {
    return { name, subject, documentKindId: documentKind.id };
  },
  name(state) {
    return state.name;
  },
  documentKind: state => property => {
    return state.documentKind[property];
  },
  defaultName: state => docType => {
    if (docType == 1) {
      let dated = "";
      moment(state.dated).format("L");
      if (state.dated) {
        dated = moment(state.dated).format("L");
      }
      return `${dated} ${state.subject} ${state.documentKind.shortName}`;
    }
  },
  documentId(state) {
    return state.documentId;
  }
};
export const mutations = {
  SET_NAME(state, payload) {
    state.name = payload;
  },
  SUBJECT(state, payload) {
    state.subject = payload;
  },
  DATED(state, payload) {
    state.dated = payload;
  },
  DOCUMENT_KIND(state, payload) {
    state.documentKind = payload;
  },
  SET_DOCUMENT_ID(state, payload) {
    state.documentId = payload;
  }
};
export const actions = {
  setSubject({ commit }, payload) {
    commit("SUBJECT", payload);
  },
  setDated({ commit }, payload) {
    commit("DATED", payload);
  },
  setDocumentKind({ commit }, payload) {
    commit("DOCUMENT_KIND", payload);
  },
  setName({ commit }, payload) {
    commit("SET_NAME", payload);
  },
  setDocumentId({ commit }, payload) {
    commit("SET_DOCUMENT_ID", payload);
  }
};
