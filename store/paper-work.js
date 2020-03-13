import moment from "moment";
export const state = () => ({
  subject: "",
  dated: "",
  docKindName: ""
});

export const getters = {
  dated(state) {
    return state.dated;
  },
  defaultName: state => docType => {
    if (docType == 1) {
      let dated = "";
      moment(state.dated).format("L");
      if (state.dated) {
        dated = moment(state.dated).format("L");
      }
      return `${dated} ${state.subject} ${state.docKindName}`;
    }
  }
};
export const mutations = {
  SUBJECT(state, payload) {
    state.subject = payload;
  },
  DATED(state, payload) {
    state.dated = payload;
  },
  DOC_KIND_NAME(state, payload) {
    state.docKindName = payload;
  }
};
export const actions = {
  setSubject({ commit }, payload) {
    commit("SUBJECT", payload);
  },
  setDated({ commit }, payload) {
    commit("DATED", payload);
  },
  setDocKindName({ commit }, payload) {
    commit("DOC_KIND_NAME", payload);
  }
};
