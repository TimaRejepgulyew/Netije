export const state = () => ({
    employeeId: null,
    name: null
});

export const getters = {
    name({ name }) {
        return name;
    }
}

export const mutations = {
    INIT_USER(state, payload) {
        state.name = payload.name;
        state.employeeId = payload.employeeId;
    }
}

export const actions = {
    initUser({ commit, dispatch }, payload) {
        console.log(payload)
        commit("INIT_USER",payload)
    }
}