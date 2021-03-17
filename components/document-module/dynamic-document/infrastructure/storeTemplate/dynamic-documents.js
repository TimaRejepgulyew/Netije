import dataApi from "~/static/dataApi";

const obj = {
    state: {
        docFlow: null,
        docType: "",
        overlays: 0,
        isNew: true,
        isDataChanged: false,
        needRerender: false,
        elements: [],
    },
    getters: {
        getAllElements(state) {
            return state.elements;
        },
        getElementById: state => id => {
            let el;
            state.elements.forEach(element => {
                if (element.id === id) {
                    el = element;
                }
            });
            return el;
        },
        overlays(state) {
            return state.overlays;
        },
        docType(state) {
            return state.docType;
        },
        docFlow(state) {
            return state.docFlow;
        },
        needRerender(state) {
            return state.needRerender;
        },
        isNew(state) {
            return state.isNew;
        },
        isDataChanged(state) {
            return state.isDataChanged;
        },
        controls(state) {
            let controls = state.elements.map((element) => {
                return {
                    dataField: element.dataField,
                    isRequired: element.isRequired || false,
                    isMultiply: element.isMultiple || false,
                    editorType: element.editorType
                }
            })
            return controls
        }
    },
    mutations: {
        SET_ELEMENTS(state, payload) {
            state.elements = payload;
        },
        ADD_NEW_ELEMENT(state, payload) {
            state.isDataChanged = true;
            state.elements.push(payload);
            state.needRerender = false;
        },
        INSERT_UNDER_ELEMENT(state, { id, payload }) {
            state.elements.forEach((element, index) => {
                if (element.id === id) {
                    state.isDataChanged = true;
                    state.elements.splice(index + 1, 0, payload);
                }
            });
        },
        CHANGE_ELEMENT(state, payload) {
            let err;
            state.elements.forEach((element, index) => {
                if (
                    element.id !== payload.id &&
                    element.dataField === payload.dataField
                ) {
                    err = true;
                    throw new Error("There should not be two identical dataField");
                }
            });
            state.elements.forEach((element, index) => {
                if (element.id === payload.id && !err) {
                    state.isDataChanged = true;
                    state.elements[index] = { ...payload };
                    state.elements.push({});
                    state.elements.pop({});
                }
            });
        },
        REMOVE_ELEMENT(state, id) {
            state.elements.forEach((element, index) => {
                if (element.id === id) {
                    state.isDataChanged = true;
                    state.elements.splice(index, 1);
                }
            });
        },
        CLEAN_STATE(state) {
            state.docFlow = null;
            state.docType = "";
            state.overlays = 0;
            state.isNew = true;
            state.isDataChanged = false;
            state.needRerender = false;
            state.elements = [];
        },
        INCREMENT_OVERLAYS(state) {
            state.overlays++;
        },
        DECREMENT_OVERLAYS(state) {
            state.overlays--;
        },
        START_DATA_TRACKING(state) {
            state.isDataChanged = true;
        },
        STOP_DATA_TRACKING(state) {
            state.isDataChanged = false;
        },
        SET_IS_NEW(state, payload) {
            state.isNew = payload;
        },
        CHANGE_DOC_TYPE(state, payload) {
            if (state.docType != payload) {
                state.isDataChanged = true;
            }
            state.docType = payload;
        },
        CHANGE_DOC_FLOW(state, payload) {
            if (state.docFlow != payload) {
                state.isDataChanged = true;
            }
            state.docFlow = payload;
        },
        CHECK_DATA_FIELD(state) {
            state.elements.forEach(element => {
                if (element.dataField == "") {
                    throw new Error("datafield must not be empty")
                }
            });
        }
    },
    actions: {
        async get_dynamic_type_by_id({ commit }, documentType) {
            const { data } = await this.$axios.get(
                dataApi.dynamicDocument.documentType + "/" + documentType
            );
            let elements = JSON.parse(data.form);
            commit("CHANGE_DOC_FLOW", data.documentFlow);
            commit("CHANGE_DOC_TYPE", data.name);
            commit("SET_ELEMENTS", elements);
            commit("SET_IS_NEW", !data.isModifiedDocumentType);
            commit("STOP_DATA_TRACKING");
        },
        async create_dynamic_type({ commit, state, getters }) {
            console.log(dataApi.dynamicDocument.createDocumentType, "T=his dsoghaisdfghksdfjghksdf");
            let jsonElements = JSON.stringify(state.elements);
            await this.$axios.post(dataApi.dynamicDocument.createDocumentType, {
                name: state.docType,
                documentFlow: state.docFlow,
                form: jsonElements,
                controls: getters.controls
            });
            commit("STOP_DATA_TRACKING");
        },
        async change_dynamic_type({ commit, state, getters }, documentType) {
            let jsonElements = JSON.stringify(state.elements);
            await this.$axios.put(
                dataApi.dynamicDocument.documentType + "/" + documentType,
                {
                    id: documentType * 1,
                    name: state.docType,
                    documentFlow: state.docFlow,
                    form: jsonElements,
                    controls: getters.controls
                }
            );
            commit("STOP_DATA_TRACKING");
        },
        async remove_dynamic_type({ state }, documentType) {
            await this.$axios.delete(
                dataApi.dynamicDocument.documentType + "/" + documentType
            );
        }
    }
};

export const state = () => obj.state;
export const getters = obj.getters;
export const actions = obj.actions;
export const mutations = obj.mutations;
