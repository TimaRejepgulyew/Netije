export const state = () => ({
    documentCountByQuery: {
    }
});

export const getters = {
    documentCount: (state) => documentQuery => {
        return state.documentCountByQuery[documentQuery]
    },

};
export const mutations = {
    COUNT_UPDATE(state, payload) {
        state.documentCountByQuery = payload
    },


};
export const actions = {
    async loadDocumentCount({ commit }) {
        const { data } = await this.$axios.get(`${this.$dataApi.documentModule.GetAllCountDocument}/100`)
        console.log(data);
        commit("COUNT_UPDATE", data)
    }
};