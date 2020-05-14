import NumberingType from "~/infrastructure/constants/numberingTypes";

export const state = () => ({
  isDataChanged: false,
  readOnly: false,
  canUpdate: false,
  canRemove: false,
  canRegister: false,
  isRegistered: false,
  selectedDocumentNumberingType: null
});

export const getters = {
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
  canRemove({ canRemove }) {
    return !canRemove;
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
  SET_DOCUMENT_STATE(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
