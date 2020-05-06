export const state = () => ({
    docflow: (context) => {
        return [
            { id: 0, name: context.$t("translations.fields.incomingEnum") },
            { id: 1, name: context.$t("translations.fields.outcomingEnum") },
            { id: 2, name: context.$t("translations.fields.inner") },
            { id: 3, name: context.$t("translations.fields.contracts") }
        ];
    },
    numberingType: (context) => {
        return [
            { id: 1, name: context.$t("translations.fields.registrable") },
            { id: 2, name: context.$t("translations.fields.numerable") },
            { id: 3, name: context.$t("translations.fields.notNumerable") }
        ];
    },
})

export const getters = {
    docflow: (state) => context => {
        return state.docflow(context);
    },
    numberingType: (state) => context => {
        return state.numberingType(context);
    }
}