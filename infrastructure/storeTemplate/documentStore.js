import NumberingType from "~/infrastructure/constants/numberingTypes";
import docmentKindService from "~/infrastructure/services/documentKind.js";
import dataApi from "~/static/dataApi";
import RegistrationState from "~/infrastructure/constants/documentRegistrationState.js";
const checkDataChanged = (oldValue, newValue) => oldValue !== newValue;
export const state = () => ({
  document: {},
  documentState: {},
  isNew: false,
  isDataChanged: false,
  canUpdate: false,
  canDelete: false,
  canRegister: false,
  isRegistered: false,
  skipRouteHandling: false,
  skipDestroy: false,
  loadedFromUrl: true,
  overlays: null
});

export const getters = {
  document({ document }) {
    return document;
  },
  loadedFromUrl({ loadedFromUrl }) {
    return loadedFromUrl;
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
    console.log("num", numberingType != NumberingType.NotNumerable);
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
export const mutations = {
  SET_VERSION(state, payload) {
    state.document.hasVersions = true;
    state.document.canBeOpenedWithPreview = payload.canBeOpenedWithPreview;
    state.document.extension = payload.extension;
  },
  CLEAR_REGISTRATION_DATA(state) {
    state.document.documentRegisterId = null;
    state.document.registrationDate = null;
    state.document.registrationNumber = null;
  },
  SET_DOCUMENT_GROUP_ID(state, payload) {
    if (checkDataChanged(state.document.documentGroupId, payload)) {
      state.isDataChanged = true;
    }
    state.document.documentGroupId = payload;
  },
  SET_DOCUMENT_KIND(state, payload) {
    if (checkDataChanged(state.document.documentKindId, payload.id))
      state.isDataChanged = true;

    state.document.documentKind = payload;
    if (payload) state.document.documentKindId = payload.id;
    else state.document.documentKindId = null;
  },
  SET_LIFE_CYCLE_STATE(state, payload) {
    if (checkDataChanged(state.document.lifeCycleState, payload)) {
      state.isDataChanged = true;
    }
    state.document.lifeCycleState = payload;
  },
  SET_INTERNAL_APPROVAL_STATE(state, payload) {
    if (checkDataChanged(state.document.internalApprovalState, payload)) {
      state.isDataChanged = true;
    }
    state.document.internalApprovalState = payload;
  },
  SET_EXTERNAL_APPROVAL_STATE(state, payload) {
    if (checkDataChanged(state.document.externalApprovalState, payload)) {
      state.isDataChanged = true;
    }
    state.document.externalApprovalState = payload;
  },
  SET_EXECUTION_STATE(state, payload) {
    if (checkDataChanged(state.document.executionState, payload)) {
      state.isDataChanged = true;
    }
    state.document.executionState = payload;
  },
  SET_CONTROL_EXECUTION_STATE(state, payload) {
    if (checkDataChanged(state.document.controlExecutionState, payload)) {
      state.isDataChanged = true;
    }
    state.document.controlExecutionState = payload;
  },
  SET_NAME(state, payload) {
    state.document.name = payload;
  },
  SET_DEFAULT_NAME(state, payload) {
    state.document.name = payload;
  },
  SET_IS_NEW(state, payload) {
    state.isNew = payload;
  },
  SET_SUBJECT(state, payload) {
    if (checkDataChanged(state.document.subject, payload)) {
      state.isDataChanged = true;
    }
    state.document.subject = payload;
  },
  SET_NOTE(state, payload) {
    if (checkDataChanged(state.document.note, payload)) {
      state.isDataChanged = true;
    }
    state.document.note = payload;
  },
  SET_CORRESPONDENT_ID(state, payload) {
    if (checkDataChanged(state.document.correspondentId, payload)) {
      state.isDataChanged = true;
    }
    state.document.correspondentId = payload;
  },
  SET_COUNTERPARTY(state, payload) {
    if (checkDataChanged(state.document.counterpartyId, payload)) {
      state.isDataChanged = true;
    }
    state.document.counterpartyId = payload;
  },
  SET_TOTAL_AMOUNT(state, payload) {
    if (checkDataChanged(state.document.totalAmount, payload)) {
      state.isDataChanged = true;
    }
    state.document.totalAmount = payload;
  },
  SET_CURRENCY_ID(state, payload) {
    if (checkDataChanged(state.document.currencyId, payload)) {
      state.isDataChanged = true;
    }
    state.document.currencyId = payload;
  },
  SET_DOCUMENT_GROUP_ID(state, payload) {
    if (checkDataChanged(state.document.documentGroupId, payload)) {
      state.isDataChanged = true;
    }
    state.document.documentGroupId = payload;
  },
  SET_AUTOMATIC_RENEWAL(state, payload) {
    if (checkDataChanged(state.document.isAutomaticRenewal, payload)) {
      state.isDataChanged = true;
    }
    state.document.isAutomaticRenewal = payload;
  },
  SET_CONTACT_ID(state, payload) {
    if (checkDataChanged(state.document.contactId, payload)) {
      state.isDataChanged = true;
    }
    state.document.contactId = payload;
  },
  SET_COUNTERPART_SIGNATORY_ID(state, payload) {
    if (checkDataChanged(state.document.counterpartySignatoryId, payload)) {
      state.isDataChanged = true;
    }
    state.document.counterpartySignatoryId = payload;
  },
  SET_DELIVERY_METHOD_ID(state, payload) {
    console.log("delivery");
    if (checkDataChanged(state.document.deliveryMethodId, payload)) {
      state.isDataChanged = true;
    }
    state.document.deliveryMethodId = payload;
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
  SET_ADDRESSE_ID(state, payload) {
    if (checkDataChanged(state.document.addresseeId, payload)) {
      state.isDataChanged = true;
    }
    state.document.addresseeId = payload;
  },
  IN_RESPONSE_TO_ID(state, payload) {
    if (checkDataChanged(state.document.inResponseToId, payload)) {
      state.isDataChanged = true;
    }
    state.document.inResponseToId = payload;
  },
  IN_NUMBER(state, payload) {
    if (checkDataChanged(state.document.inNumber, payload)) {
      state.isDataChanged = true;
    }
    state.document.inNumber = payload;
  },
  NUMBER(state, payload) {
    if (checkDataChanged(state.document.number, payload)) {
      state.isDataChanged = true;
    }
    state.document.number = payload;
  },
  DATED(state, payload) {
    if (checkDataChanged(state.document.dated, payload)) {
      state.isDataChanged = true;
    }
    state.document.dated = payload;
  },
  DATE(state, payload) {
    if (checkDataChanged(state.document.date, payload)) {
      state.isDataChanged = true;
    }
    state.document.date = payload;
  },
  SET_IS_ADJUSTMENT(state, payload) {
    if (checkDataChanged(state.document.isAdjustment, payload)) {
      state.isDataChanged = true;
    }
    state.document.isAdjustment = payload;
  },
  SET_CORRECTED_ID(state, payload) {
    if (checkDataChanged(state.document.correctedId, payload)) {
      state.isDataChanged = true;
    }
    state.document.correctedId = payload;
  },
  SET_CASE_FILE_ID(state, payload) {
    if (checkDataChanged(state.document.caseFileId, payload)) {
      state.isDataChanged = true;
    }
    state.document.caseFileId = payload;
  },
  SET_PLACE_TO_CASE_FILE_DATE_ID(state, payload) {
    if (checkDataChanged(state.document.placedToCaseFileDate, payload)) {
      state.isDataChanged = true;
    }
    state.document.placedToCaseFileDate = payload;
  },
  SET_DOCUMENT(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  SET_OUR_SIGNATORY_ID(state, payload) {
    if (checkDataChanged(state.document.ourSignatoryId, payload)) {
      state.isDataChanged = true;
    }
    state.document.ourSignatoryId = payload;
  },
  SET_PREPARED_BY_ID(state, payload) {
    if (checkDataChanged(state.document.preparedById, payload)) {
      state.isDataChanged = true;
    }
    state.document.preparedById = payload;
  },
  SET_ASSIGNEE_ID(state, payload) {
    if (checkDataChanged(state.document.assigneeId, payload)) {
      state.isDataChanged = true;
    }
    state.document.assigneeId = payload;
  },
  SET_LEADING_DOCUMENT_ID(state, payload) {
    if (checkDataChanged(state.document.leadingDocumentId, payload)) {
      state.isDataChanged = true;
    }

    state.document.leadingDocumentId = payload;
  },
  SET_ISSUED_TO_ID(state, payload) {
    if (checkDataChanged(state.document.issuedToId, payload)) {
      state.isDataChanged = true;
    }
    state.document.issuedToId = payload;
  },
  SET_VALID_FROM(state, payload) {
    if (checkDataChanged(state.document.validFrom, payload)) {
      state.isDataChanged = true;
    }
    state.document.validFrom = payload;
  },
  SET_VALID_TILL(state, payload) {
    if (checkDataChanged(state.document.validTill, payload)) {
      state.isDataChanged = true;
    }
    state.document.validTill = payload;
  },
  SET_RESPONSIBLE_EMPLOYEE_ID(state, payload) {
    if (checkDataChanged(state.document.responsibleEmployeeId, payload)) {
      state.isDataChanged = true;
    }
    state.document.responsibleEmployeeId = payload;
  },
  SET_IS_STANDARD(state, payload) {
    if (checkDataChanged(state.document.isStandard, payload)) {
      state.isDataChanged = true;
    }
    state.document.isStandard = payload;
  },
  SET_DAYS_TO_FINISH_WORKS(state, payload) {
    if (checkDataChanged(state.document.daysToFinishWorks, payload)) {
      state.isDataChanged = true;
    }
    state.document.daysToFinishWorks = payload;
  },
  SET_VALID_TILL(state, payload) {
    if (checkDataChanged(state.document.validTill, payload)) {
      state.isDataChanged = true;
    }
    state.document.validTill = payload;
  },
  SET_REGISTRATION_NUMBER(state, payload) {
    state.document.registrationNumber = "" + payload;
  },
  SET_REGISTRATION_DATE(state, payload) {
    state.document.registrationDate = payload;
  },
  SET_DOCUMENT_REGISTER_ID(state, payload) {
    state.document.documentRegisterId = payload;
  },
  IS_REGISTERED(state, payload) {
    state.isRegistered = payload === RegistrationState.Registered;
  },
  DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  },
  SKIP_DESTROY(state, payload) {
    state.skipDestroy = payload;
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
  LOADED_FROM_URL(state, payload) {
    state.loadedFromUrl = payload;
  },
  CLEAR_DOCUMENT(state) {
    state.document = {};
  },
  INCREMENT_OVERLAYS(state) {
    if (state.overlays === null) {
      state.overlays = 0;
    } else state.overlays++;
  },
  DECREMENT_OVERLAYS(state) {
    state.overlays--;
  }
};
export const actions = {
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
      dispatch("loadDocument", res.data);
      commit("SET_IS_NEW", false);
    }
    commit("DATA_CHANGED", false);
    return;
  },
  setDocumentKind({ commit, dispatch }, payload) {
    if (!payload) payload = docmentKindService.emptyDocumentKind();
    commit("SET_DOCUMENT_KIND", payload);
  },
  setSubject({ commit, dispatch }, payload) {
    commit("SET_SUBJECT", payload);
    dispatch("reevaluateDocumentName");
  },
  setLeadingDocumentId({ commit, dispatch }, payload) {
    commit("SET_LEADING_DOCUMENT_ID", payload);
    dispatch("reevaluateDocumentName");
  },
  setIssuedToId({ commit, dispatch }, payload) {
    commit("SET_ISSUED_TO_ID", payload);
    dispatch("reevaluateDocumentName");
  },
  setCorrespondent({ commit, dispatch }, payload) {
    commit("SET_CORRESPONDENT_ID", payload);
    dispatch("reevaluateDocumentName");
  },
  setCounterparty({ commit, dispatch }, payload) {
    commit("SET_COUNTERPARTY", payload);
    dispatch("reevaluateDocumentName");
  },
  async reevaluateDocumentName({ state, commit }) {
    if (state.document.documentKind.generateDocumentName) {
      const { data } = await this.$axios.post(
        dataApi.documentModule.ReevaluateDocumentName,
        state.document
      );
      commit("SET_NAME", data);
    }
  },
  loadDocument({ commit }, payload) {
    payload.document.documentKind = docmentKindService.emptyDocumentKind();
    commit("IS_REGISTERED", payload.document.registrationState);
    commit("SET_DOCUMENT", payload);
  },

  async registration({ dispatch }, payload) {
    const { data } = await this.$axios.post(
      dataApi.documentRegistration.RegisterDocument,
      payload
    );
    dispatch("loadDocument", data);
  },
  async unRegister({ dispatch, state }) {
    var { data } = await this.$axios.post(
      dataApi.documentRegistration.UnregisterDocument,
      {
        documentTypeGuid: state.document.documentTypeGuid,
        documentId: state.document.id
      }
    );
    dispatch("loadDocument", data);
  },
  destroyDocument({ state, commit }) {
    if (!state.skipDestroy) {
      commit("SET_IS_NEW", false);
    }
    commit("DATA_CHANGED", false);
  }
};
