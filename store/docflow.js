import NumberingType from "~/infrastructure/constants/numberingTypes";
import Docflow from "~/infrastructure/constants/docflows";
export const state = () => ({
    docflow: (context) => {
        return [
            { id: Docflow.Incoming, name: context.$t("translations.fields.incomingEnum") },
            { id: Docflow.Outgoing, name: context.$t("translations.fields.outcomingEnum") },
            { id: Docflow.Internal, name: context.$t("translations.fields.inner") }
        ];
    },
    numberingType: (context) => {
        return [
            { id: NumberingType.Registrable, name: context.$t("translations.fields.registrable") },
            { id: NumberingType.Numerable, name: context.$t("translations.fields.numerable") },
            { id: NumberingType.NotNumerable, name: context.$t("translations.fields.notNumerable") }
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