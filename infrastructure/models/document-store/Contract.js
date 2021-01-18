import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";

export default class Contract extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_COUNTERPARTY(state, payload) {
        if (checkDataChanged(state.document.counterpartyId, payload)) {
          state.isDataChanged = true;
        }
        state.document.counterpartyId = payload;
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
      SET_OUR_SIGNATORY(state, payload) {
        if (checkDataChanged(state.document.ourSignatory, payload)) {
          state.isDataChanged = true;
          state.document.ourSignatoryId = payload;
        }
      },
      SET_RESPONSIBLE_EMPLOYEE(state, payload) {
        if (checkDataChanged(state.document.responsibleEmployee, payload)) {
          state.isDataChanged = true;
          state.document.responsibleEmployee = payload;
        }
      },
      SET_CURRENCY_ID(state, payload) {
        if (checkDataChanged(state.document.currencyId, payload)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
        }
      },
      SET_TOTAL_AMOUNT(state, payload) {
        if (checkDataChanged(state.document.totalAmount, payload)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_VALID_FROM(state, payload) {
        if (checkDataChanged(state.document.validFrom, payload)) {
          state.isDataChanged = true;
          state.document.validFrom = payload;
        }
      },
      SET_VALID_TILL(state, payload) {
        if (checkDataChanged(state.document.validTill, payload)) {
          state.isDataChanged = true;
        }
        state.document.validTill = payload;
      },
      SET_BUSINESS_UNIT(state, payload) {
        if (checkDataChanged(state.document.businessUnit, payload)) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT(state, payload) {
        if (checkDataChanged(state.document.department, payload)) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_ADDRESSE(state, payload) {
        if (checkDataChanged(state.document.addressee, payload)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      SET_DOCUMENT_GROUP_ID(state, payload) {
        if (checkDataChanged(state.document.documentGroupId, payload)) {
          state.isDataChanged = true;
          state.document.documentGroupId = payload;
        }
      },
      SET_IS_STANDARD(state, payload) {
        if (checkDataChanged(state.document.isStandard, payload)) {
          state.isDataChanged = true;
        }
        state.document.isStandard = payload;
      },
      SET_RESPONSIBLE_EMPLOYEE_ID(state, payload) {
        if (checkDataChanged(state.document.responsibleEmployeeId, payload)) {
          state.isDataChanged = true;
        }
        state.document.responsibleEmployeeId = payload;
      },
      SET_AUTOMATIC_RENEWAL(state, payload) {
        if (checkDataChanged(state.document.isAutomaticRenewal, payload)) {
          state.isDataChanged = true;
        }
        state.document.isAutomaticRenewal = payload;
      },
      SET_DAYS_TO_FINISH_WORKS(state, payload) {
        if (checkDataChanged(state.document.daysToFinishWorks, payload)) {
          state.isDataChanged = true;
        }
        state.document.daysToFinishWorks = payload;
      }
    };
    const actions = {
      ...options?.actions,
      setLeadingDocument({ commit, dispatch }, payload) {
        commit("SET_LEADING_DOCUMENT", payload);
        dispatch("reevaluateDocumentName");
      },
      setCounterparty({ commit, dispatch }, payload) {
        commit("SET_COUNTERPARTY", payload);
        dispatch("reevaluateDocumentName");
      }
    };
    super({ mutations, actions });
  }
}
