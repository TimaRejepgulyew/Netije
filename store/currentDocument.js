export const state = () => ({
  isDataChanged: true,
  readOnly: false,
  canUpdate: true,
  canRegister: false,
  isRegistered: false
});

export const getters = {
  isreadOnlyOrNotDataChanged({ isDataChanged, readOnly }) {
    console.log(readOnly || !isDataChanged, "isreadOnlyOrNotDataChanged");
    return readOnly || !isDataChanged;
  },
  canRegister({ canRegister }) {
    return canRegister;
  },
  canUpdate({ canUpdate }) {
    return canUpdate;
  },
  isRegistered({ isRegistered }) {
    return isRegistered;
  },
  isReadOnly({ isReadOnly }) {
    return isReadOnly;
  }
};
export const mutations = {
  SET_DOCUMENT_STATE(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
      console.log(state[item]);
    }
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
