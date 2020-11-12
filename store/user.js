export const state = () => ({
    employeeId: null,
    name: null,
    personalPhotoHash:null,
});

export const getters = {
    name({ name }) {
        return name;
    },
    personalPhotoHash({ personalPhotoHash }) {
        return personalPhotoHash;
    }
}

export const mutations = {
    INIT_USER(state, payload) {
        state.name = payload.name;
        state.employeeId = payload.employeeId;
        state.personalPhotoHash = payload.personalPhotoHash;
        console.log(payload);
    }
}

export const actions = {
    initUser({ commit, dispatch }, payload) {
        commit("INIT_USER",payload)
    }
}