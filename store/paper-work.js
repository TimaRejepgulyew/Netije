import moment from "moment";
export const state = () => ({
  name: "",
  subject: "",
  dated: "",
  documentKind: {},
  placedToCaseFileDate: null,
  caseFileId: null,
  note: "",
  correspondentId: null
});

export const getters = {
  mainFormProperties({
    name,
    subject,
    documentKind,
    placedToCaseFileDate,
    caseFileId,
    note
  }) {
    return {
      name,
      subject,
      documentKindId: documentKind.id,
      placedToCaseFileDate,
      caseFileId,
      note
    };
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
      if (state.dated) {
        dated = moment(state.dated).format("L");
      }
      return `${dated} ${state.subject} ${state.documentKind.shortName}`;
    } else if (docType == 2) {
      return `${state.correspondentId} ${state.subject} ${state.documentKind.shortName}`;
    }
  }
};
export const mutations = {
  MAIN_FORM_PROPERTIES(state, payload) {
    for (let property in payload) {
      state[property] = payload[property];
    }
  }
};
export const actions = {
  setMainFormProperties({ commit }, payload) {
    commit("MAIN_FORM_PROPERTIES", payload);
  }
};
