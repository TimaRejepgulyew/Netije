import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js"
export default class {

    docmentKindService = docmentKindService
    state = {
        document: {},
        documentState: {},
        isNew: false,
        isDataChanged: false,
        canUpdate: false,
        canDelete: false,
        canRegister: false,
        isRegistered: false,
        skipRouteHandling: true,
        overlays: null
    }
    getters = {
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
        registrationData({ document }) {
            const regDate = {
                documentId: document.id,
                isCustomNumber: document.isCustomNumber,
                registrationDate: document.registrationDate,
                registrationNumber: document.registrationNumber,
                documentRegisterId: document.documentRegisterId,
                documentTypeGuid: document.documentTypeGuid
            };
            return regDate;
        }
    }
    mutations = {
        SET_VERSION(state, payload) {
            state.document.hasVersions = true;
            state.document.canBeOpenedWithPreview = payload.canBeOpenedWithPreview;
            state.document.extension = payload.extension;
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
        SET_DOCUMENT(state, payload) {
            for (let item in payload) {
                state[item] = payload[item];
            }
        },
        IS_REGISTERED(state, payload) {
            state.isRegistered = payload === RegistrationState.Registered;
        },
        DATA_CHANGED(state, payload) {
            state.isDataChanged = payload;
        },
        SKIP_ROUTE_HANDLING(state, payload) {
            state.skipRouteHandling = payload;
        },
        START_DATA_TRACKING(state) {
            state.trackDataChange = true;
        },
        STOP_DATA_TRACKING(state) {
            state.trackDataChange = false;
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
    actions = {
        setDocumentKind({ commit }, payload) {
            if (!payload) payload = docmentKindService.emptyDocumentKind();
            commit("SET_DOCUMENT_KIND", payload);
        },
        setSubject({ commit, dispatch }, payload) {
            commit("SET_SUBJECT", payload);
            dispatch("reevaluateDocumentName");
        },
        async delete({ state }) {
            await this.$axios.delete(
                `${dataApi.documentModule.DeleteDocument}${state.document.documentTypeGuid}/${state.document.id}`
            );
        },
        async save({ dispatch, commit, state }) {
            const document = JSON.stringify(state.document);
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
        loadDocument({ commit }, payload) {
            //  TODO:  Создать функццю глубокого копирования
            payload.document.documentKind = this.docmentKindService.emptyDocumentKind();
            commit("IS_REGISTERED", payload.document.registrationState);
            commit("SET_DOCUMENT", payload);
        },
    }
    constructor(options) {
        this.mutations = { ...this.mutations, ...options?.mutations }
        this.getters = { ...this.getters, ...options?.getters }
        this.state = { ...this.state, ...options?.state }
        this.actions = {
            ...options?.actions,
            ...this.actions,
            setDocumentKind({ commit }, payload) {
                if (!payload) payload = docmentKindService.emptyDocumentKind();
                commit("SET_DOCUMENT_KIND", payload);
            },
            setSubject({ commit, dispatch }, payload) {
                commit("SET_SUBJECT", payload);
                dispatch("reevaluateDocumentName");
            },
        }
        console.log(this.mutations, "actions");
    }
    stateOptions() {
        return this.state
    }
    getterOptions() {
        return this.getters
    }
    mutationOptions() {
        return this.mutations
    }
    actionOptions() {
        return this.actions
    }
}