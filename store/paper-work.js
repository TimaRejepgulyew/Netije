export const state = () => ({
  name: "",
  subject: "",
  dated: "",
  documentKind: {},
  placedToCaseFileDate: null,
  caseFileId: null,
  correspondent: "",
  hasPermissions: true,
  regProperties: {},
  urlByTypeGuid: [
    ,
    "/paper-work/incomming-letter/form/",
    "/paper-work/outgoing-letter/form/",
    "/paper-work/order/form/",
    "/paper-work/company-directive/form/",
    "/paper-work/simple-document/form/",
    "/paper-work/addendum/form/",
    "/paper-work/memo/form/",
    "/paper-work/power-of-attorney/form/"
  ],
  regState: [
    { id: null, name: "notRegistered" },
    { id: 0, name: "registered" },
    { id: 1, name: "notRegistered" }
  ],
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
  regState({ regState }) {
    return regState;
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
  hasPermissions({ hasPermissions }) {
    return hasPermissions;
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
