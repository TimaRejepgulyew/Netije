export const state = () => ({
    config: {
        antivirus: false,
        accountingDocs: false,
        contractualDocs: false,
        dynamicDocuments: false,
        documentTemplates: false,
        orgLimitation: false,
        filesEditing: false,
        internalExchange: true,
        externalExchange: true,
        chat: true
    }
});

export const getters = {
    getConfig(state) {
        return state.config;
    },

    getAntivirus(state) {
        return state.config.antivirus;
    },

    getAccountingDocs(state) {
        return state.config.accountingDocs;
    },

    getContractualDocs(state) {
        return state.config.contractualDocs;
    },

    getDynamicDocuments(state) {
        return state.config.dynamicDocuments;
    },

    getDocumentTemplates(state) {
        return state.config.documentTemplates;
    },

    getOrgLimitation(state) {
        return state.config.orgLimitation;
    },

    getFilesEditing(state) {
        return state.config.filesEditing;
    },

    getInternalExchange(state) {
        return state.config.internalExchange;
    },

    getExternalExchange(state) {
        return state.config.externalExchange;
    },

    getChat(state) {
        return state.config.chat;
    },

    getTemplate(state) {
        return state.config.documentTemplates
    }
};

export const mutations = {
    setConfig(state, config) {
        state.config = config;
    }
}
