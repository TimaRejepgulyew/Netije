import BaseDocumentStore from "~/infrastructure/models/document-store/Base.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
import dataApi from "~/static/dataApi";
function mergeArray(newArr, oldArr) {
  const newArrAsObject = {};
  newArr.forEach(item => {
    newArrAsObject[item.name] = item;
  });
  oldArr.forEach(item => {
    if (newArrAsObject[item.name]) {
      newArrAsObject[item.name] = item;
    }
  });
  return Object.values(newArrAsObject);
}
function generateParametrsToObject(array) {
  return array.map(item => {
    return { name: item, dataSource: "" };
  });
}
function checkArrayChanged(first, second) {
  if (first.length && second.length) {
    return first.some(item => second.includes(item));
  } else if (!first.length && !second.length) {
    return false;
  } else {
    return true;
  }
}
function checkParamsChanged(first, second) {
  first = first.map(item => item.dataSource);
  second = second.map(item => item.dataSource);
  return checkArrayChanged(first, second);
}
export default class DocumentTemplate extends BaseDocumentStore {
  _checkArrayChanged(first, second) {
    if (first.length && second.length) {
      return first.some(item => second.includes(item));
    } else if (!first.length && !second.length) {
      return false;
    } else {
      return true;
    }
  }
  _checkParamsChanged(first, second) {
    first = first.map(item => item.dataSource);
    second = second.map(item => item.dataSource);
    return this._checkArrayChanged(first, second);
  }
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_DOCUMENT_KINDS: (state, payload) => {
        if (this._checkArrayChanged(state.document.documentKinds, payload)) {
          state.isDataChanged = true;
          state.document.documentKinds = payload;
        }
      },
      SET_DOCUMENT_TYPE: (state, payload) => {
        if (this._checkDataChanged(state.document.documentTypeId, payload)) {
          state.isDataChanged = true;
          state.document.documentTypeId = payload;
        }
      },
      SET_BUSINESS_UNITS: (state, payload) => {
        if (this._checkArrayChanged(state.document.businessUnits, payload)) {
          state.isDataChanged = true;
          state.document.businessUnits = payload;
        }
      },
      SET_DEPARTMENTS: (state, payload) => {
        if (this._checkArrayChanged(state.document.departments, payload)) {
          state.isDataChanged = true;
          state.document.departments = payload;
        }
      },
      SET_PARAMETERS: (state, payload) => {
        if (this._checkParamsChanged(state.document.parameters, payload)) {
          state.isDataChanged = true;
          state.document.parameters = payload;
        }
      },
      SET_DESCRIPTION: (state, payload) => {
        if (this._checkDataChanged(state.document.description, payload)) {
          state.isDataChanged = true;
          state.document.description = payload;
        }
      }
    };

    const actions = {
      async mergeFieldNameParams({ state, commit }) {
        const { data: mergeField } = await this.$axios.get(
          dataApi.documentTemplate.GetAllMergeFieldName + state.document.id
        );
        if (state.document.parameters && mergeField) {
          const newParams = generateParametrsToObject(mergeField);
          const oldParams = state.document.parameters;
          commit("SET_PARAMETERS", mergeArray(newParams, oldParams));
        } else {
          commit("SET_PARAMETERS", []);
        }
      },
      async updateLastVersion({ state, commit, dispatch }) {
        dispatch("mergeFieldNameParams");
        const { data: lastVersion } = await this.$axios.get(
          dataApi.documentModule.Last + state.document.id
        );
        commit("UPDATE_LAST_VERSION", lastVersion);
      },
      async setVersion({ commit, dispatch }, payload) {
        dispatch("mergeFieldNameParams");
        commit("SET_VERSION", payload);
      },
      setDocumentKind({ commit }, payload) {
        if (!payload) payload = docmentKindService.emptyDocumentKind();
        commit("SET_DOCUMENT_KIND", payload);
      },
      ...options?.actions
    };
    const getters = {
      ...options?.getters,
      parameters(state) {
        if (state.document.parameters)
          return JSON.parse(
            JSON.stringify([...state.document.parameters.slice()])
          );
      }
    };
    super({ actions, mutations, getters });
  }
}
