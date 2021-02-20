import dataApi from "~/static/dataApi";

const obj = {
    state: {
        elements: [
            {
                id: 21,
                dataField: "haha",
                colSpan: 1,
                isRequired: false,
                translationRu: "Новое поле",
                translationTk: "Taze",
                editorType: "dxTextBox"
            },
            {
                id: 31,
                dataField: "huhu",
                colSpan: 2,
                isRequired: false,
                translationRu: "Новое поле",
                translationTk: "Taze",
                editorType: "dxDateBox"
            }
        ],
        overlays: 0,
        isDataChanged: false,
    },
    getters: {
        getAllElements(state) {
            return state.elements
        },
        getElementById: (state) => (id) => {
            let el
            state.elements.forEach(element => {
                if (element.id === id) {
                    el = element
                }
            });
            return el
        },
        getOverlays(state) {
            return state.overlays
        },
        isDataChanged(state) {
            return state.isDataChanged
        },
    },
    mutations: {
        SetElements(state, payload) {
            state.elements = payload
        },
        AddNewElement(state, payload) {
            state.isDataChanged = true
            state.elements.push(payload)
        },
        IntroduceElement(state, { id, payload }) {
            state.elements.forEach((element, index) => {
                if (element.id === id) {
                    state.isDataChanged = true
                    state.elements.splice(index + 1, 0, payload)
                }
            });
        },
        ChangeElement(state, payload) {
            console.log("payload", payload);
            state.elements.forEach((element, index) => {
                if (element.id === payload.id) {
                    state.isDataChanged = true
                    // for (const key in payload) {
                    //     console.log(key);
                    // }
                    state.elements[index] = { ...payload }
                    state.elements.push({})
                    state.elements.pop({})
                }
            });
        },
        RemoveElement(state, id) {
            state.elements.forEach((element, index) => {
                if (element.id === id) {
                    state.isDataChanged = true
                    state.elements.splice(index, 1);
                }
            });
        },
        IncrementOverlays(state) {
            if (state.overlays <= 0) {
                state.overlays++;
            }
        },
        DecrementOverlays(state) {
            if (state.overlays >= 0) {
                state.overlays--;
            }
        },
        StartDataTracking(state) {
            state.isDataChanged = true
        },

        StopDataTracking(state) {
            state.isDataChanged = false
        },
    },
    actions: {
        async get_elements({ commit }, id) {
            const { data } = await this.$axios.get(dataApi.dinamicTypes.get, id)
            commit("SetElements", data)
        },
        async create_dinamic_type({ commit }) {
            // await this.$axios.post(dataApi.dinamicTypes.post,)
            commit("StopDataTracking")

        },
        async change_dinamic_type({ state }, id) {
            await this.$axios.put(dataApi.dinamicTypes.put, id)
            commit("StopDataTracking")
        }
    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations