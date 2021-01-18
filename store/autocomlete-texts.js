import dataApi from "~/static/dataApi";

const obj = {
    state: {
        allTexts: [
            {
                id: 1,
                text: "BlaBla",
                category: 1,
                entityType: 1
            },
            {
                id: 2,
                text: "Blahuy",
                category: 1,
                entityType: 1
            },
            {
                id: 2,
                text: "AzaAza",
                category: 0,
                entityType: 2
            },

        ],
        documentTexts: {}
    },
    getters: {
        getAll: ({ allTexts }) => ({ category, entityType }) => {
            console.log(allTexts);
            return allTexts.filter(el => {
                console.log(el, category, entityType);
                return el.category === category && el.entityType === entityType
            })
        },
    },
    mutations: {
        SET_AUTOCOMLETE_TEXTS(state, payload) {
            state.allTexts = payload
        },
    },
    actions: {
        async loadTexts({ commit }) {
            let { data } = await this.$axios.get(dataApi.autocompleteTexts.load)
            commit("SET_AUTOCOMLETE_TEXTS", data)
        },

    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations