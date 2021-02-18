import dataApi from "~/static/dataApi";

const obj = {
    state: {
        elements: [
            {
                id: 21,
                fieldName: "",
                colSpan: 2,
                isRequired: false,
                label: {
                    text: "Новое поле",
                    location: "left",
                },
                editorOptions: {},
                editorType: "dxTextBox"
            },
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
        getOverlays({ overlays }) {
            return overlays
        },
        isDataChanged({ isDataChanged }) {
            return isDataChanged
        }
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
            state.elements.forEach((element, index) => {
                if (element.id === payload.id) {
                    state.isDataChanged = true
                    state.elements[index] = payload
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

    },
    actions: {
        async get_elements({ commit }, id) {
            const { data } = await this.$axios.get(dataApi.dinamicTypes.get, id)
            commit("SetElements", data)
        },
        async save_elements() {
            await this.$axios.post(dataApi.dinamicTypes.post, id)
            state.isDataChanged = false
        }
    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations