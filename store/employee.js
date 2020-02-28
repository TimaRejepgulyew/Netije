export const state = () => ({
  popupRoleVisible: false
});

export const getters = {
  popupRoleVisible(state) {
    return state.status;
  }
};
export const mutations = {
  POPUP_ROLE_VISIBLE(state, payload) {
    state.popupRoleVisible = payload;
  }
};
export const actions = {
  getTaskByFilter({ commit }, payload) {
    const config = {
      params: payload
    };
    this.$axios
      .$get("http://192.168.4.88/api/task/filter", config)
      .then(response => {
        payload = response;
        commit("GET_TASK", payload);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
