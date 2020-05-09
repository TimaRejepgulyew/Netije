export const state = () => ({
  isDataChanged: false,
  readOnly: false,
  canUpdate: false,
  canRegister: false,
  isRegistered: false
});

export const getters = {
  canRegister({ canRegister }) {
    return canRegister;
  },
  canUpdate({ canUpdate }) {
    return canUpdate;
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
      console.log(state[item], item);
    }
  },
  DATA_CHANGED(state, payload) {
    console.log("data");
    state.isDataChanged = payload;
  }
};
