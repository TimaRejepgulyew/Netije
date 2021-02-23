import dataApi from "~/static/dataApi";

const obj = {
    state: {
        docFlow: null,
        docType: "Prig Skok",
        overlays: 1,
        isNew: true,
        isDataChanged: false,
        needRerender: false,
        elements: [
            {
                id: 21,
                dataField: "haha",
                colSpan: 1,
                isRequired: false,
                translationRu: "Новое поле",
                translationTk: "Taze",
                editorType: "dxDateBox"
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
        overlays(state) {
            return state.overlays
        },
        docType(state) {
            return state.docType
        },
        docFlow(state) {
            return state.docFlow
        },
        needRerender(state) {
            return state.needRerender
        },
        isNew(state) {
            return state.isNew
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
            state.needRerender = false
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
            let err
            state.elements.forEach((element, index) => {
                if (element.id !== payload.id && element.dataField === payload.dataField) {
                    err = true
                    throw new Error("There should not be two identical dataField")
                }
            });
            state.elements.forEach((element, index) => {
                if (element.id === payload.id && !err) {
                    state.isDataChanged = true
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
            state.overlays++;
        },
        DecrementOverlays(state) {
            state.overlays--;
        },
        StartDataTracking(state) {
            state.isDataChanged = true
        },

        StopDataTracking(state) {
            state.isDataChanged = false
        },
        SetIsNew(state, payload) {
            state.isNew = payload
        },
        ChangeDocType(state, payload) {
            state.docType = payload
        },
        ChangeDocFlow(state, payload) {
            state.docFlow = payload
        },
    },
    actions: {
        async get_dinamic_type({ commit }, id) {
            console.log("Element Geted");
            // const { data } = await this.$axios.get(dataApi.dinamicTypes.get, id)
            // commit("SetElements", data)
            commit("SetIsNew", false)
        },
        async create_dinamic_type({ commit }) {
            console.log("Element Created");
            // await this.$axios.post(dataApi.dinamicTypes.post,)
            // commit("StopDataTracking")
        },
        async change_dinamic_type({ state }, id) {
            console.log("Element Changed");
            // await this.$axios.put(dataApi.dinamicTypes.put, id)
            // commit("StopDataTracking")
        },
        async remove_dinamic_type({ state }, id) {
            console.log("Element Removed");
            // await this.$axios.put(dataApi.dinamicTypes.put, id)
            // commit("StopDataTracking")
        },
    }
}

export const state = () => obj.state;
export const getters = obj.getters;
export const actions = obj.actions;
export const mutations = obj.mutations;
