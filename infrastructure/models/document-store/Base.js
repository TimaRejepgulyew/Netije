import { assignIn as _assignIn, isEqual as _isEqual } from "lodash";

import * as documentService from "~/infrastructure/services/documentService.js";
import NumberingType from "~/infrastructure/constants/numberingTypes";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";
export default class Base {
  _checkDataChanged = checkDataChanged;
  _checkDataAsObjectChanged = (newValue, oldValue) => {
    console.log(checkDataChanged(newValue?.id, oldValue?.id));
    return checkDataChanged(newValue?.id, oldValue?.id);
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
    canRegister({ canRegister, document: { documentKind } }) {
      if (!documentKind) {
        return false;
      }
      return (
        canRegister && documentKind.numberingType !== NumberingType.NotNumerable
      );
    },
    canExchange({ canExchange }) {
      return canExchange;
    },
    isRegistrable({ document: { documentKind } }) {
      if (!documentKind) {
        return false;
      }
      return documentKind.numberingType !== NumberingType.NotNumerable;
    },
    canUpdate({ canUpdate }) {
      return canUpdate;
    },
    canDelete({ canDelete }) {
      return canDelete;
    },

    isRegistered({ document }) {
      return document.registrationState === RegistrationState.Registered;
    },
    readOnly({ canUpdate, document }) {
      return (
        !canUpdate ||
        document.registrationState === RegistrationState.Registered
      );
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
    SET_NAME: (state, payload) => {
      if (this._checkDataChanged(payload, state.document.name)) {
        state.document.name = payload;
        state.isDataChanged = true;
      }
    },
    SET_IS_NEW(state, payload) {
      state.isNew = payload;
    },
    SET_NOTE: (state, payload) => {
      if (this._checkDataChanged(payload, state.document.note)) {
        state.document.note = payload;
        state.isDataChanged = true;
      }
    },
    SET_DOCUMENT(state, payload) {
      if (_isEqual(state.document, {})) {
        _assignIn(state, payload);
        Object.assign(state.document, {});
        return;
      }
      function assignObject(state, payload) {
        for (let item in payload) {
          if (payload[item] === null) {
            state[item] = null;
            continue;
          }
          if (typeof payload[item] !== "object") {
            if (state[item] !== payload[item]) state[item] = payload[item];
            continue;
          } else {
            if (_isEqual(state[item], payload[item])) {
              continue;
            }
            if (item === "document") assignObject(state[item], payload[item]);
            else {
              state[item] = payload[item];
            }
          }
        }
      }
      assignObject(state, payload);
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
  createStore() {
    const state = () => this.stateOptions();
    const getters = { ...this.getterOptions() };
    const actions = {
      ...this.actionOptions()
    };
    const mutations = { ...this.mutationOptions() };
    return { state, getters, actions, mutations };
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
