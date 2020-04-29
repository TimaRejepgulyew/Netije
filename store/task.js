export const state = () => ({
  generateName: ""
});
export const mutations = {
  GENERATE_NAME(state, payload) {
    state.generateName = payload;
  }
};
export const getters = {
  generateName: ({ generateName }) => {
    return generateName;
  }
};
