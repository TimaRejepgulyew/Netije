import NumberingType from "~/infrastructure/constants/numberingTypes";
import Docflow from "~/infrastructure/constants/docflows";
import RegisterType from "~/infrastructure/constants/registerTypes";

export const state = () => ({
    docflow: (context) => {
        return [
            { id: Docflow.Incoming, name: context.$t("translations.fields.incomingEnum") },
            { id: Docflow.Outgoing, name: context.$t("translations.fields.outcomingEnum") },
            { id: Docflow.Internal, name: context.$t("translations.fields.inner") },
            { id: Docflow.Contracts, name: context.$t("translations.fields.contracts") }
        ];
    },
    numberingType: (context) => {
        return [
            { id: NumberingType.Registrable, name: context.$t("translations.fields.registrable") },
            { id: NumberingType.Numerable, name: context.$t("translations.fields.numerable") },
            { id: NumberingType.NotNumerable, name: context.$t("translations.fields.notNumerable") }
        ];
    },
    numberingPeriod: (context) => {
        return [
            {
                id: 0,
                name: context.$t("translations.fields.year")
            },
            {
                id: 1,
                name: context.$t("translations.fields.quarter")
            },
            {
                id: 2,
                name: context.$t("translations.fields.month")
            },
            {
                id: 3,
                name: context.$t("translations.fields.continuous")
            }
        ];
    },
    registerType: (context) => {
        return [
            {
                id: RegisterType.Registration,
                name: context.$t("translations.fields.registration")
            },
            {
                id: RegisterType.Numbering,
                name: context.$t("translations.fields.numbering")
            }
        ]
    },
    numberingSection: (context) => {
        return [
            {
                name: context.$t("translations.fields.noSection"),
                id: 0
            }
        ]
    },
    numberFormatItems: (context) => {
        return [
            {
                id: 1,
                name: context.$t("translations.fields.number")
            },
            {
                id: 2,
                name: context.$t("translations.fields.year2Place")
            },
            {
                id: 3,
                name: context.$t("translations.fields.year4Place")
            },
            {
                id: 4,
                name: context.$t("translations.fields.quarter")
            },
            {
                id: 5,
                name: context.$t("translations.fields.month")
            },
            {
                id: 6,
                name: context.$t("translations.fields.leadingNumber")
            },
            {
                id: 7,
                name: context.$t("translations.fields.log")
            },
            {
                id: 8,
                name: context.$t("translations.fields.caseFile")
            },
            {
                id: 9,
                name: context.$t("translations.fields.departmentCode")
            },
            {
                id: 10,
                name: context.$t("translations.fields.buCode")
            },
            {
                id: 11,
                name: context.$t("translations.fields.docKindCode")
            },
            {
                id: 12,
                name: context.$t("translations.fields.cPartyCode")
            },
            {
                id: 13,
                name: context.$t("translations.fields.customString")
            },
            {
                id: 14,
                name: context.$t("translations.fields.registrPlace")
            }
        ]
    }
})

export const getters = {
    docflow: (state) => context => {
        return state.docflow(context);
    },
    numberingType: (state) => context => {
        return state.numberingType(context);
    },
    numberingPeriod: (state) => context => {
        return state.numberingPeriod(context);
    },
    registerType: (state) => context => {
        return state.registerType(context);
    },
    numberingSection: (state) => context => {
        return state.numberingSection(context);
    },
    numberFormatItems: (state) => context => {
        return state.numberFormatItems(context);
    }
}