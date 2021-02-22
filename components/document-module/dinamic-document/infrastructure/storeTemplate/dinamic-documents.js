import dataApi from "~/static/dataApi";

const obj = {
  state: {
    docFlow: "",
    docType: "Prig Skok",
    isNew: true,
    overlays: 0,
    isDataChanged: false,
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
        editorType: "EmployeeBox"
      }
    ]
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
    getOverlays(state) {
      return state.overlays;
    },
    docType(state) {
      return state.docType;
    },
    docFlow(state) {
      return state.docFlow;
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
      state.elements.forEach((element, index) => {
        if (element.id === payload.id) {
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
    async get_dinamic_type({ commit }, id) {
      // const { data } = await this.$axios.get(dataApi.dinamicTypes.get, id)
      // commit("SetElements", data)
      commit("SetIsNew", false);
    },
    async create_dinamic_type({ commit }) {
      // await this.$axios.post(dataApi.dinamicTypes.post,)
      // commit("StopDataTracking")
    },
    async change_dinamic_type({ state }, id) {
      // await this.$axios.put(dataApi.dinamicTypes.put, id)
      // commit("StopDataTracking")
    }
  }
};

export const state = () => obj.state;
export const getters = obj.getters;
export const actions = obj.actions;
export const mutations = obj.mutations;
