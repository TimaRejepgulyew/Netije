import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
const checkDataChanged = (oldValue, newValue) => oldValue !== newValue;
export const state = () => ({
    document: {

    },
    isNew: false,
    isDataChanged: false,
    canUpdate: false,
    canDelete: false,
    canRegister: false,
    isRegistered: false,
    skipRouteHandling: true,
    overlays: null
});

export const getters = {
    overlays({ overlays }) {
        return overlays;
    },
    document({ document }) {
        return document;
    },
    skipRouteHandling({ skipRouteHandling }) {
        return skipRouteHandling;
    },
    canRegister({
        canRegister,
        document: {
            documentKind: { numberingType }
        }
    }) {
        return canRegister && numberingType != NumberingType.NotNumerable;
    },
    isRegistrable({
        document: {
            documentKind: { numberingType }
        }
    }) {
        return numberingType != NumberingType.NotNumerable;
    },
    canUpdate({ canUpdate }) {
        console.log("canup", canUpdate);
        return canUpdate;
    },
    canDelete({ canDelete }) {
        return canDelete;
    },
    isRegistered({ document }) {
        return document.registrationState == RegistrationState.Registered;
    },
    readOnly({ canUpdate, isRegistered }) {
        return !canUpdate || isRegistered;
    },
    isDataChanged({ isDataChanged }) {
        return isDataChanged;
    },
    isNew({ isNew }) {
        return isNew;
    },
};
export const mutations = {
    SET_VERSION(state, payload) {
        state.document.hasVersions = true;
        state.document.canBeOpenedWithPreview = payload.canBeOpenedWithPreview;
        state.document.extension = payload.extension;
    },
    SET_DOCUMENT_TYPE_(state, payload) {
        if (checkDataChanged(state.document.documentTypeId, payload))
            state.isDataChanged = true;
        state.document.documentTypeId = payload
    },
    SET_DOCUMENT_KIND_ID(state, payload) {
        if (checkDataChanged(state.document.documentKindId, payload))
            state.isDataChanged = true;

        state.document.documentKindId = payload;
    },
    IS_REGISTERED(state, payload) {
        state.isRegistered = payload === RegistrationState.Registered;
    },
    SET_NAME(state, payload) {
        state.document.name = payload;
    },
    SET_IS_NEW(state, payload) {
        state.isNew = payload;
    },
    SET_NOTE(state, payload) {
        if (checkDataChanged(state.document.note, payload)) {
            state.isDataChanged = true;
        }
        state.document.note = payload;
    },
    SET_BUSINESS_UNIT_ID(state, payload) {
        if (checkDataChanged(state.document.businessUnitId, payload)) {
            state.isDataChanged = true;
        }
        state.document.businessUnitId = payload;
    },
    SET_DEPARTMENT_ID(state, payload) {
        if (checkDataChanged(state.document.departmentId, payload)) {
            state.isDataChanged = true;
        }
        state.document.departmentId = payload;
    },
    SET_DOCUMENT(state, payload) {
        for (let item in payload) {
            state[item] = payload[item];
        }
    },
    SET_PARAM(state, { name, value }) {
        const currentParam = state.document.params.find(param => {
            return param.name === name
        })
        if (checkDataChanged(currentParam.value, value)) {
            state.isDataChanged = true;
        }
        currentParam.value = value

    },
    DATA_CHANGED(state, payload) {
        state.isDataChanged = payload;
    },
    SKIP_ROUTE_HANDLING(state, payload) {
        state.skipRouteHandling = payload;
    },
    CLEAR_DOCUMENT(state) {
        state.document = {};
    },
    INCREMENT_OVERLAYS(state) {
        if (state.overlays === null || state.overlays < 0) {
            state.overlays = 0;
        } else state.overlays++;
    },
    DECREMENT_OVERLAYS(state) {
        state.overlays--;
    }
};
export const actions = {
    async delete({ state }) {
        //TODO set right dataApi on DELETE request
        await this.$axios.delete(
            `${dataApi.documentModule.DeleteDocument}${state.document.documentTypeGuid}/${state.document.id}`
        );
    },
    async save({ dispatch, commit, state }) {
        const document = JSON.stringify(state.document);
        //TODO set right dataApi on PUT request
        const res = await this.$axios.put(
            dataApi.documentModule.Documents + state.document.id,
            {
                documentJson: document,
                documentTypeGuid: state.document.documentTypeGuid
            }
        );
        if (state.isNew) {
            // dispatch("loadDocument", res.data);
            commit("SET_IS_NEW", false);
        }
        commit("DATA_CHANGED", false);
        return;
    },
    setDocumentKind({ commit, dispatch }, payload) {
        if (!payload) payload = docmentKindService.emptyDocumentKind();
        commit("SET_DOCUMENT_KIND", payload);
    },
    loadDocument({ commit }, payload) {
        //  TODO:  Создать функццю глубокого копирования
        payload.document.documentKind = docmentKindService.emptyDocumentKind();
        commit("IS_REGISTERED", payload.document.registrationState);
        commit("SET_DOCUMENT", payload);
    },
};
