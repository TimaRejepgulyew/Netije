import dataApi from "~/static/dataApi";

const obj = {
  state: {
    docFlow: null,
    docType: "",
    overlays: 1,
    isNew: true,
    isDataChanged: false,
    needRerender: false,
    elements: []
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
    }
  },
  mutations: {
    SetElements(state, payload) {
      state.elements = payload;
    },
    AddNewElement(state, payload) {
      state.isDataChanged = true;
      state.elements.push(payload);
      state.needRerender = false;
    },
    IntroduceElement(state, { id, payload }) {
      state.elements.forEach((element, index) => {
        if (element.id === id) {
          state.isDataChanged = true;
          state.elements.splice(index + 1, 0, payload);
        }
      });
    },
    ChangeElement(state, payload) {
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
    RemoveElement(state, id) {
      state.elements.forEach((element, index) => {
        if (element.id === id) {
          state.isDataChanged = true;
          state.elements.splice(index, 1);
        }
      });
    },
    CleanState(state) {
      state.docFlow = null;
      state.docType = "";
      state.overlays = 1;
      state.isNew = true;
      state.isDataChanged = false;
      state.needRerender = false;
      state.elements = [];
    },
    IncrementOverlays(state) {
      state.overlays++;
    },
    DecrementOverlays(state) {
      state.overlays--;
    },
    StartDataTracking(state) {
      state.isDataChanged = true;
    },

    StopDataTracking(state) {
      state.isDataChanged = false;
    },
    SetIsNew(state, payload) {
      state.isNew = payload;
    },
    ChangeDocType(state, payload) {
      state.docType = payload;
    },
    ChangeDocFlow(state, payload) {
      state.docFlow = payload;
    }
  },
  actions: {
    async get_dynamic_type({ commit }, id) {
      // const { data } = await this.$axios.get(dataApi.dynamicTypes.get, id)
      // commit("SetElements", data)
      commit("SetIsNew", false);
    },
    async create_dynamic_type({ commit, state }) {
      let jsonElements = JSON.stringify(state.elements);
      await this.$axios.post(dataApi.dynamicDocument.createDocumentType, {
        name: state.docType,
        documentFlow: state.docFlow,
        form: jsonElements
      });
      commit("StopDataTracking");
    },
    async change_dynamic_type({ state }, id) {
      // await this.$axios.put(dataApi.dynamicTypes.put, id)
      // commit("StopDataTracking")
    },
    async remove_dynamic_type({ state }, id) {
      // await this.$axios.put(dataApi.dynamicTypes.put, id)
      // commit("StopDataTracking")
    }
  }
};

export const state = () => obj.state;
export const getters = obj.getters;
export const actions = obj.actions;
export const mutations = obj.mutations;
