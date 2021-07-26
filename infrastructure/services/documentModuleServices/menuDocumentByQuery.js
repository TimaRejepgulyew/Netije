import DocumentQuery from "../../constants/query/documentQuery";
import financialArchiveIcon from "~/static/icons/document-type/financial-archive.svg";
import contractIcon from "~/static/icons/document-type/contract.svg";
export default (context, rootGetters) => {
    const hasContractAccess = rootGetters => {
        return rootGetters["permissions/isResponsibleForContracts"];
    };
    const hasAccountingDocumentBaseAccess = rootGetters => {
        return rootGetters["permissions/isResponsibleFinansicalArchive"];
    };
    const incomingDocument = [{
        text: context.$i18n.t("DocumentQuery.incomingLetter"),
        query: DocumentQuery.IncomingLetter,
        template: "document-item",
        path: `/document-module/${DocumentQuery.IncomingLetter}`
    }]
    const outgoingDocument = [{
        text: context.$i18n.t("DocumentQuery.outgoingLetter"),
        query: DocumentQuery.OutgoingLetter,
        template: "document-item",
        path: `/document-module/${DocumentQuery.OutgoingLetter}`
    },]
    const internalDocument = [{
        text: context.$i18n.t("DocumentQuery.internalDocument"),
        template: "document-item",
        query: DocumentQuery.InternalDocuments,
        path: `/document-module/${DocumentQuery.InternalDocuments}`,
        items: [
            {
                text: context.$i18n.t("DocumentQuery.order"),
                path: `/document-module/${DocumentQuery.Order}`
            },
            {
                text: context.$i18n.t("DocumentQuery.companyDirective"),
                path: `/document-module/${DocumentQuery.CompanyDirective}`
            },
            {
                text: context.$i18n.t("DocumentQuery.simpleDocument"),
                path: `/document-module/${DocumentQuery.SimpleDocument}`
            },
            {
                text: context.$i18n.t("DocumentQuery.addendum"),
                path: `/document-module/${DocumentQuery.Addendum}`
            },
            {
                text: context.$i18n.t("DocumentQuery.memo"),
                path: `/document-module/${DocumentQuery.Memo}`
            },
            {
                text: context.$i18n.t("DocumentQuery.powerOfAttorney"),
                path: `/document-module/${DocumentQuery.PowerOfAttorney}`
            }
        ]
    }]
    const dynamicDocument = [{
        text: context.$i18n.t("DocumentQuery.DynamicDocument"),
        template: "document-item",
        query: DocumentQuery.DynamicDocument,
        path: `/document-module/${DocumentQuery.DynamicDocument}`
    }]
    const accountingDocuments = [{
        text: context.$i18n.t("menu.accountingDocuments"),
        icon: financialArchiveIcon,
        template: "document-item",
        query: DocumentQuery.AccountingDocuments,
        path: `/document-module/${DocumentQuery.AccountingDocuments}`,
        visible: hasAccountingDocumentBaseAccess(rootGetters)
    }]
    const contractualDocuments = [{
        text: context.$i18n.t("menu.contractualDocuments"),
        icon: contractIcon,
        template: "document-item",
        query: DocumentQuery.ContractualDocuments,
        path: `/document-module/${DocumentQuery.ContractualDocuments}`,
        visible: hasContractAccess(rootGetters)
    }]
    return [{
        query: DocumentQuery.All,
        text: context.$i18n.t("menu.recordManagementGroup"),
        path: "/document-module",
        icon: "file",
        template: "document-item",
        items: [...incomingDocument, ...outgoingDocument, ...internalDocument, ...dynamicDocument]
    }, ...accountingDocuments, ...contractualDocuments,]
};