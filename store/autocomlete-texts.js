import dataApi from "~/static/dataApi";

const obj = {
    state: {
        texts: [
            {
                id: 1,
                text: "BlaBla",
                type: "Document",
            }
        ]
    },
    getters: {
        getTextsByType(state, options) {

            return state.texts
        }
    },
    mutations: {
        SET_AUTOCOMLETE_TEXTS(state, payload) {
            state.texts = payload
        }
    },
    actions: {
        async loadTexts({ commit }) {
            let { data } = await this.$axios.get(dataApi.autocompleteTexts.load)
            commit("SET_AUTOCOMLETE_TEXTS", data)
        }
    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations