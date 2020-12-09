import BaseDocumentStore from "~/infrastructure/models/document-store/Base.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
import dataApi from "~/static/dataApi";
function checkArrayChanged(first, second) {
  if (!first.length && second.length) {
    console.log("first");
    return true;
  } else if (first.length && !second.length) {
    console.log("second");
    return true;
  } else if (!first.length && !second.length) {
    console.log("third", first.length, second.length);
    return false;
  } else {
    console.log("forth", second);

    return first.some(item => second.includes(item));
  }
}
function checkParamsChanged(first, second) {
  first = first.map(item => item.value);
  second = second.map(item => item.value);
  return checkArrayChanged(first, second);
}
export default class DocumentTemplate extends BaseDocumentStore {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_DOCUMENT_KINDS(state, payload) {
        // if (checkArrayChanged(state.document.documentKinds, payload))
        state.isDataChanged = true;
        state.document.documentKindId = payload;
      },
      SET_DOCUMENT_TYPE(state, payload) {
        if (checkDataChanged(state.document.documentTypeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.documentTypeId = payload;
      },
      SET_BUSINESS_UNITS(state, payload) {
        console.log(state.document.businessUnits, payload);
        if (checkArrayChanged(state.document.businessUnits, payload)) {
          state.isDataChanged = true;
          state.document.businessUnits = payload;
        }
      },
      SET_DEPARTMENTS(state, payload) {
        console.log(state.document.departments, payload);
        if (checkArrayChanged(state.document.departments, payload)) {
          state.isDataChanged = true;
          state.document.departments = payload;
        }
      },
      SET_ELECTRONIC_DOCUMENT_TEMPLATE_PARAMETERS(state, payload) {
        if (
          checkParamsChanged(
            state.document.electronicDocumentTemplateParameters,
            payload
          )
        )
          state.isDataChanged = true;
        state.document.electronicDocumentTemplateParameters = payload;
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
        if (state.electronicDocumentTemplateParameters) {
          state.electronicDocumentTemplateParameters.filter(item => {
            payload.include(item.name);
          });
        }
      },
      async setVersion({ state, commit }, payload) {
        const { data } = await this.$axios.get(
          dataApi.documentTemplate.GetAllMergeFieldName + state.document.id
        );
        commit("SET_ELECTRONIC_DOCUMENT_TEMPLATE_PARAMETERS", data);

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
      electronicDocumentTemplateParameters(state) {
        if (state.document.electronicDocumentTemplateParameters)
          return JSON.parse(
            JSON.stringify(
              state.document.electronicDocumentTemplateParameters.slice()
            )
          );
      }
    };
    super({ actions, mutations, getters });
  }
}
