import dataApi from "~/static/dataApi";
export const state = () => ({
  documentKinds: null,
  extension: null,
  loaded: false
});

export const getters = {
  acceptExtension({ extension }) {
    return extension.join(",");
  },
  extension({ extension }) {
    return extension;
  },
  documentKinds({ documentKinds }) {
    return documentKinds;
  }
};

export const actions = {
  async documentKinds({ commit }) {
    
  },
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
  SET_DOCUMENT_KINDS(state, payload) {
    state.documentKinds = payload;
  },
  SET_LOADED(state, payload) {
    state.loaded = payload;
  },
  SET_EXTENSION(state, payload) {
    state.extension = payload;
  }
};
