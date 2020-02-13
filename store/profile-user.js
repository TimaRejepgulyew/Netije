

export const state = () => ({
    userName:'not found',

})
export const mutations = {
    GET_USER_NAME(state, payload) {
        state.userName = payload
    },

}
export const actions = {
    getUserName({ commit }, payload) {
        commit('GET_USER_NAME', payload)

    },

}
export const getters = {
    userName(state) {
        return state.userName
    },

}