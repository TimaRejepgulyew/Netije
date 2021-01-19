import dataApi from "~/static/dataApi";

const obj = {
    state: {
        allTexts: [],
        loaded: false,
    },
    getters: {
        getAll: ({ allTexts }) => ({ category, entityType }) => {
            return allTexts.filter(el => {
                return el.category === category && el.entityType === entityType
            })
        },
    },
    mutations: {
        SET_AUTOCOMLETE_TEXTS(state, payload) {
            state.allTexts = payload
        },
        SET_LOADED(state, payload) {
            state.loaded = payload;
        },
        DELETE_TEXT(state, id) {
            return state.allTexts.forEach((item, index) => {
                if (state.allTexts[index].id === id) {
                    state.allTexts.splice(index, 1)
                }
            });
        }
    },
    actions: {
        async loadTexts({ state, commit }) {
            if (!state.loaded) {
                const timeOut = 1000 * 60 * 60;
                try {
                    let { data } = await this.$axios.get(dataApi.autocompleteTexts.load)
                    commit("SET_AUTOCOMLETE_TEXTS", data)
                    setTimeout(async () => {
                        commit("SET_LOADED", false);
                        await dispatch("loadTexts");
                    }, timeOut);
                    commit("SET_LOADED", true)
                } catch (error) {
                }
            }
        },
        async deleteText({ commit }, id) {
            commit("DELETE_TEXT", id)
            await this.$axios.delete(dataApi.autocompleteTexts.delete + id)
        },

    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations