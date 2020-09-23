import NumberingType from "~/infrastructure/constants/numberingTypes";
import Docflow from "~/infrastructure/constants/docflows";
import RegisterType from "~/infrastructure/constants/registerTypes";

export const state = () => ({
    docflow: (context) => {
        return [
            { id: Docflow.Incoming, name: context.$t("docFlow.documentType.incomingEnum") },
            { id: Docflow.Outgoing, name: context.$t("docFlow.documentType.outcomingEnum") },
            { id: Docflow.Internal, name: context.$t("docFlow.documentType.inner") },
            { id: Docflow.Contracts, name: context.$t("docFlow.documentType.contracts") }
        ];
    },
    numberingType: (context) => {
        return [
            { id: NumberingType.Registrable, name: context.$t("docFlow.numberingType.registrable") },
            { id: NumberingType.Numerable, name: context.$t("docFlow.numberingType.numerable") },
            { id: NumberingType.NotNumerable, name: context.$t("docFlow.numberingType.notNumerable") }
        ];
    },
    numberingPeriod: (context) => {
        return [
            {
                id: 0,
                name: context.$t("docFlow.numberingPeriod.year")
            },
            {
                id: 1,
                name: context.$t("docFlow.numberingPeriod.quarter")
            },
            {
                id: 2,
                name: context.$t("docFlow.numberingPeriod.month")
            },
            {
                id: 3,
                name: context.$t("docFlow.numberingPeriod.continuous")
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
                name: context.$t("docFlow.numberFormat.number")
            },
            {
                id: 2,
                name: context.$t("docFlow.numberFormat.year2Place")
            },
            {
                id: 3,
                name: context.$t("docFlow.numberFormat.year4Place")
            },
            {
                id: 4,
                name: context.$t("docFlow.numberFormat.quarter")
            },
            {
                id: 5,
                name: context.$t("docFlow.numberFormat.month")
            },
            {
                id: 6,
                name: context.$t("docFlow.numberFormat.leadingNumber")
            },
            {
                id: 7,
                name: context.$t("docFlow.numberFormat.log")
            },
            {
                id: 8,
                name: context.$t("docFlow.numberFormat.caseFile")
            },
            {
                id: 9,
                name: context.$t("docFlow.numberFormat.departmentCode")
            },
            {
                id: 10,
                name: context.$t("docFlow.numberFormat.buCode")
            },
            {
                id: 11,
                name: context.$t("docFlow.numberFormat.docKindCode")
            },
            {
                id: 12,
                name: context.$t("docFlow.numberFormat.cPartyCode")
            },
            {
                id: 13,
                name: context.$t("docFlow.numberFormat.customString")
            },
            {
                id: 14,
                name: context.$t("docFlow.numberFormat.registrPlace")
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