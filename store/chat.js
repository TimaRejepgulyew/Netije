export const state = () => ({
    isActive: false,
    defaultOptions: {},
    defaultPanel: "empty-panel"
});

export const getters = {
    isActive(state) {
        return state.isActive;
    },

    defaultOptions(state) {
        return state.defaultOptions;
    },

    defaultPanel(state) {
        return state.defaultPanel;
    }
};

export const mutations = {
    openForm(state, options) {
        if (options) {
            state.defaultOptions = options;
            state.defaultPanel = "chating-panel";
        } else {
            state.defaultPanel = "empty-panel";
            state.defaultOptions = {};
        }
        state.isActive = true;
    },
    closeForm(state) {
        state.isActive = false;
    }
};
