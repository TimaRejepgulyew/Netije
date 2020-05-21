export const state = () => ({
  name: "",
  subject: "",
  dated: "",
  documentKind: {},
  placedToCaseFileDate: null,
  caseFileId: null,
  correspondent: "",
  regProperties: {},
  filterBuilderPopupPosition: {
    at: "top",
    my: "top",
    offset: { y: 10 }
  }
});

export const getters = {
  filterBuilderPopupPosition(state) {
    return state.filterBuilderPopupPosition;
  },
  registrationState: (state) => context => {
    return [{ id: 0, name: context.$t("translations.fields.registered") },
    { id: 1, name: context.$t("translations.fields.notRegistered") }]
  },
  urlByTypeGuid({ urlByTypeGuid }) {
    return urlByTypeGuid;
  },
  mainFormProperties({
    name,
    subject,
    documentKind,
    placedToCaseFileDate,
    caseFileId
  }) {
    return {
      name,
      subject,
      documentKindId: documentKind.id,
      placedToCaseFileDate,
      caseFileId
    };
  },
  name(state) {
    console.log(state.name);
    return state.name;
  },
  documentKind: state => property => {
    return state.documentKind[property];
  },
  defaultName: state => (docType, context) => {
    let subject = "";
    if (state.subject) {
      subject = state.subject;
    }
    let documentKind = "";
    if (state.documentKind.shortName) {
      documentKind = state.documentKind.shortName;
    }
    let correspondent = "";
    if (docType == 2) {
      if (state.correspondent) {
        correspondent = ` ${context.$t("translations.fields.for")} ${
          state.correspondent
          }`;
      }
      return `${documentKind} ${subject} ${correspondent}`;
    } else if (docType == 1) {
      if (state.correspondent) {
        correspondent = `${context.$t("translations.fields.from")} ${
          state.correspondent
          }`;
      }
      return `${documentKind} ${correspondent} ${subject}`;
    } else {
      return `${documentKind}  ${subject}`;
    }
  },
  regProperties({ regProperties }) {
    return regProperties;
  }
};
export const mutations = {
  MAIN_FORM_PROPERTIES(state, payload) {
    for (let property in payload) {
      state[property] = payload[property];
    }
  },
  SET_HAS_PERMISSIONS(state, payload) {
    state.hasPermissions = payload;
  },
  SET_REG_PROPERTIES(state, payload) {
    state.regProperties = payload;
  }
};
export const actions = {
  setMainFormProperties({ commit }, payload) {
    commit("MAIN_FORM_PROPERTIES", payload);
  }
};
