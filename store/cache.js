import dataApi from "~/static/dataApi";
export const state = () => ({
  extension: null,
  loaded: false
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
  async loadAll({ state, commit, dispatch }) {
    if (!state.loaded) {
      const timeOut = 1000 * 60 * 60;
      for (let item in state) {
        await dispatch(item);
      }
      setTimeout(async () => {
        commit("SET_LOADED", false);
        await dispatch("loadAll");
      }, timeOut);
      commit("SET_LOADED", true);
    }
  }
};

export const mutations = {
  SET_LOADED(state, payload) {
    state.loaded = payload;
  },
  SET_EXTENSION(state, payload) {
    state.extension = payload;
  }
};
