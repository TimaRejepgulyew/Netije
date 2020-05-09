export const state = () => ({
  isDataChanged: true,
  readOnly: false,
  canUpdate: true,
  canRegister: false,
  isRegistered: false
});

export const getters = {
  canRegister({ canRegister }) {
    return canRegister;
  },
  canUpdate({ canUpdate, isDataChanged }) {
    return canUpdate && isDataChanged;
  },
  isRegistered({ isRegistered }) {
    return isRegistered;
  },
  readOnly({ readOnly }) {
    return readOnly;
  }
};
export const mutations = {
  SET_DOCUMENT_STATE(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
      console.log(state[item], item);
    }
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  }
};
