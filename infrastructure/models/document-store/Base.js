import * as documentService from "~/infrastructure/services/documentService.js";
import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Base {
  _setValueAsObject(value, stateProperty, dataChanged) {
    if (this._checkDataAsObjectChanged(value, stateProperty)) {
      stateProperty = value;
      dataChanged = true;
    }
  }
  _setValue(value, stateProperty, dataChanged) {
    if (this._checkDataChanged(value, stateProperty)) {
      stateProperty = value;
      dataChanged = true;
    }
  }
  _checkDataChanged = checkDataChanged;
  _checkDataAsObjectChanged = (newValue, oldValue) => {
    return checkDataChanged(newValue, oldValue);
  };
  state = {
    document: {},
    documentState: {},
    isNew: false,
    isDataChanged: false,
    canExchange: false,
    canUpdate: false,
    canDelete: false,
    canRegister: false,
    isRegistered: false,
    skipRouteHandling: true,
    overlays: null,
    fullAccess: false
  };
  getters = {
    fullAccess({ fullAccess }) {
      return fullAccess;
    },
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
    canExchange({ canExchange }) {
      return canExchange;
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
  };
  mutations = {
    CLEAN_STATE(state) {
      for (let prop in state) {
        state[prop] = null;
      }
      state = {};
    },
    UPDATE_LAST_VERSION(state, payload) {
      if (payload)
        state.document.canBeOpenedWithPreview = payload.canBeOpenedWithPreview;
      else {
        state.document.hasVersions = false;
        state.document.canBeOpenedWithPreview = false;
      }
    },
    SET_VERSION(state, payload) {
      state.document.hasVersions = true;
      state.document.canBeOpenedWithPreview = payload.canBeOpenedWithPreview;
      state.document.extension = payload.extension;
    },
    SET_NAME(state, payload) {
      this._setValue(payload, state.document.name, state.isDataChanged);
    },
    SET_IS_NEW(state, payload) {
      state.isNew = payload;
    },
    SET_NOTE(state, payload) {
      this._setValue(payload, state.document.note, state.isDataChanged);
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
    async save({ dispatch, commit, state }) {
      await documentService.save(this, { commit, dispatch, state });
    },
    async removeVersion({ state, commit }, versionId) {
      await this.$axios.delete(
        dataApi.documentModule.RemoveVersion + versionId
      );
    },
    setDocumentKind({ commit }, payload) {
      if (!payload) payload = docmentKindService.emptyDocumentKind();
      commit("SET_DOCUMENT_KIND", payload);
    },
    async delete({ state }) {
      await this.$axios.delete(
        `${dataApi.documentModule.DeleteDocument}${state.document.documentTypeGuid}/${state.document.id}`
      );
    }
  };
  constructor(options) {
    this.mutations = { ...this.mutations, ...options?.mutations };
    this.getters = { ...this.getters, ...options?.getters };
    this.state = { ...this.state, ...options?.state };
    this.actions = {
      ...options?.actions,
      ...this.actions
    };
  }
  stateOptions() {
    return this.state;
  }
  getterOptions() {
    return this.getters;
  }
  mutationOptions() {
    return this.mutations;
  }
  actionOptions() {
    return this.actions;
  }
}
