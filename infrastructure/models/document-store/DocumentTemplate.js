import BaseDocumentStore from "~/infrastructure/models/document-store/Base.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
import dataApi from "~/static/dataApi";
function mergeArray(newArr, oldArr) {
 const newFieldsNames = []
  const dataSource = {};
  oldArr.forEach(p=>{
    dataSource.
  })
}
function checkArrayChanged(first, second) {
  if (!first.length && second.length) {
    return true;
  } else if (first.length && !second.length) {
    return true;
  } else if (!first.length && !second.length) {
    return false;
  } else {
    return first.some(item => second.includes(item));
  }
}
function checkParamsChanged(first, second) {
  first = first.map(item => item.dataSource);
  second = second.map(item => item.dataSource);
  return checkArrayChanged(first, second);
}
export default class DocumentTemplate extends BaseDocumentStore {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_DOCUMENT_KINDS(state, payload) {
        if (checkArrayChanged(state.document.documentKinds, payload)) {
          state.isDataChanged = true;
          state.document.documentKinds = payload;
        }
      },
      SET_DOCUMENT_TYPE(state, payload) {
        if (checkDataChanged(state.document.documentTypeId, payload)) {
          state.isDataChanged = true;
          state.document.documentTypeId = payload;
        }
      },
      SET_BUSINESS_UNITS(state, payload) {
        if (checkArrayChanged(state.document.businessUnits, payload)) {
          state.isDataChanged = true;
          state.document.businessUnits = payload;
        }
      },
      SET_DEPARTMENTS(state, payload) {
        if (checkArrayChanged(state.document.departments, payload)) {
          state.isDataChanged = true;
          state.document.departments = payload;
        }
      },
      SET_PARAMETERS(state, payload) {
        if (checkParamsChanged(state.document.parameters, payload))
          state.isDataChanged = true;
        state.document.parameters = payload;
      },
      SET_DESCRIPTION(state, payload) {
        if (checkDataChanged(state.document.description, payload)) {
          state.isDataChanged = true;
        }
        state.document.description = payload;
      }
    };

    const actions = {
      mergeFieldNameParams({ state, commit }, payload) {
        if (state.document.parameters && payload) {
          let dataSource = {};
          state.document.parameters.forEach(element => {
            if (payload.includes(element.name)) {
              dataSource[element.name] = element;
            }
          });
          payload.forEach(element => {
            if (!dataSource[element]) {
              dataSource[element] = { name: element, dataSource: "" };
            }
          });
          commit("SET_PARAMETERS", Object.values(dataSource));
          console.log(Object.values(dataSource));
        } else {
          commit("SET_PARAMETERS", []);
        }
      },
      async updateLastVersion({ state, commit }) {
        const { data: lastVersion } = await this.$axios.get(
          dataApi.documentModule.Last + state.document.id
        );
        commit("UPDATE_LAST_VERSION", lastVersion);

        const { data: mergeFieldName } = await this.$axios.get(
          dataApi.documentTemplate.GetAllMergeFieldName + state.document.id
        );
        if (mergeFieldName) {
          const parseObj = mergeFieldName.map(item => {
            return { name: item, dataSource: "" };
          });
          console.log(mergeFieldName, parseObj);
          commit("SET_PARAMETERS", parseObj);
        } else {
          commit("SET_PARAMETERS", []);
        }
      },
      async setVersion({ state, commit, dispatch }, payload) {
        const { data } = await this.$axios.get(
          dataApi.documentTemplate.GetAllMergeFieldName + state.document.id
        );

        dispatch("mergeFieldNameParams", data);
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
