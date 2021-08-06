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
    //TODO not test it 
    async loadDocumentCount({ commit }) {
        try {
            const { data } = await this.$axios.get(`${this.$dataApi.documentModule.GetAllCountDocument}/100`)
            commit("COUNT_UPDATE", data)
        } catch (error) {
            console.log(error);
        }

    }
};