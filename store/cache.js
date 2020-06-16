import dataApi from "~/static/dataApi";
export const state = () => ({
  extension: null
});

export const getters = {
  acceptExtension({ extension }) {
    return extension.join(",");
  },
  extension({ extension }) {
    return extension;
  }
};
export const actions = {
  async extension({ commit }) {
    const { data } = await this.$axios.get(
      dataApi.docFlow.AssociatedApplication
    );
    const extension = await data.data.map(el => {
      return el.extension;
    });
    commit("SET_EXTENSION", extension);
  },
  async loadAll({ state, dispatch }) {
    const timeOut = 1000 * 60 * 60;
    for (let item in state) {
      await dispatch(item);
    }
    setTimeout(async () => {
      await dispatch("loadAll");
    }, timeOut);
  }
};

export const mutations = {
  SET_EXTENSION(state, payload) {
    state.extension = payload;
  }
};
