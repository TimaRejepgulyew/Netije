import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
import checkDataChanged from "~/infrastructure/services/checkDataChanged.js";

export default class Contract extends ElectronicDocument {
  constructor(options) {
    const mutations = {
      ...options?.mutations,
      SET_COUNTERPARTY:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.counterpartyId)) {
          state.document.counterpartyId = payload;
          state.isDataChanged = true;
        }
      },
      SET_CONTACT_ID:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.contactId)) {
          state.document.contactId = payload;
          state.isDataChanged = true;
        }
      },
      SET_COUNTERPART_SIGNATORY_ID:(state, payload)=> {
        if (
          this._checkDataChanged(
            payload,
            state.document.counterpartySignatoryId
          )
        ) {
          state.document.counterpartySignatoryId = payload;
          state.isDataChanged = true;
        }
      },
      SET_OUR_SIGNATORY:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(payload, state.document.ourSignatory)
        ) {
          state.document.ourSignatory = payload;
          state.isDataChanged = true;
        }
      },
      SET_RESPONSIBLE_EMPLOYEE:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(
            payload,
            state.document.responsibleEmployee
          )
        ) {
          state.document.responsibleEmployee = payload;
          state.isDataChanged = true;
        }
      },
      SET_CURRENCY_ID:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.currencyId)) {
          state.isDataChanged = true;
          state.document.currencyId = payload;
        }
      },
      SET_TOTAL_AMOUNT:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.totalAmount)) {
          state.isDataChanged = true;
          state.document.totalAmount = payload;
        }
      },
      SET_VALID_FROM:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.validFrom)) {
          state.isDataChanged = true;
          state.document.validFrom = payload;
        }
      },
      SET_VALID_TILL:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.validTill)) {
          state.isDataChanged = true;
          state.document.validTill = payload;
        }
      },
      SET_BUSINESS_UNIT:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(payload, state.document.businessUnit)
        ) {
          state.isDataChanged = true;
          state.document.businessUnit = payload;
        }
      },
      SET_DEPARTMENT:(state, payload)=> {
        if (
          this._checkDataAsObjectChanged(payload, state.document.department)
        ) {
          state.isDataChanged = true;
          state.document.department = payload;
        }
      },
      SET_ADDRESSE:(state, payload)=> {
        if (this._checkDataAsObjectChanged(payload, state.document.addressee)) {
          state.isDataChanged = true;
          state.document.addressee = payload;
        }
      },
      SET_DOCUMENT_GROUP_ID:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.documentGroupId)) {
          state.isDataChanged = true;
          state.document.documentGroupId = payload;
        }
      },
      SET_IS_STANDARD:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.isStandard)) {
          state.isDataChanged = true;
          state.document.isStandard = payload;
        }
      },
      SET_AUTOMATIC_RENEWAL:(state, payload)=> {
        if (
          this._checkDataChanged(payload, state.document.isAutomaticRenewal)
        ) {
          state.isDataChanged = true;
          state.document.isAutomaticRenewal = payload;
        }
      },
      SET_DAYS_TO_FINISH_WORKS:(state, payload)=> {
        if (this._checkDataChanged(payload, state.document.daysToFinishWorks)) {
          state.isDataChanged = true;
          state.document.daysToFinishWorks = payload;
        }
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
