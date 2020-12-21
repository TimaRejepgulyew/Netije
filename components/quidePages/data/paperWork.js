
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js"
import EntityType from "~/infrastructure/constants/entityTypes";
import controlIcon from "~/static/icons/quide-page/control.svg"
import reportIcon from "~/static/icons/quide-page/report-icon.svg"
import documentIcon from "~/static/icons/quide-page/documents.svg"
export default function (context) {
    function isVisible(accessKey) {
        return context.$store.getters["permissions/allowReading"](accessKey);
    }
    const pathGenerate = detail => {
        return `/document-module/${detail}`;
    };
    const paperWork = [
        {
            icon: documentIcon,
            title: context.$t("paperWork.documents.title"),
            items: [
                {
                    name: context.$t("paperWork.documents.incomingLetter"),
                    description: context.$t("paperWork.documents.incomingLetterDescr"),
                    path: pathGenerate(DocumentQuery.IncomingLetter),
                    visible: isVisible(EntityType.IncomingLetter),

                },
                {
                    name: context.$t("paperWork.documents.outgoingLetter"),
                    description: context.$t("paperWork.documents.outgoingLetterDescr"),
                    visible: isVisible(EntityType.OutgoingLetter),
                    path: pathGenerate(DocumentQuery.OutgoingLetter),

                },
                {
                    name: context.$t("paperWork.documents.internalDocument"),
                    description: context.$t("paperWork.documents.internalDocumentDescr"),
                    visible: true,
                    path: pathGenerate(DocumentQuery.InternalDocument),

                },
            ]
        },

        {
            icon: controlIcon,
            title: context.$t("paperWork.control.title"),
            items: [

                {
                    name: context.$t("paperWork.control.actionItemExicution"),
                    description: context.$t("paperWork.control.actionItemExicutionDescr"),
                    path: "/task/taskCategory/action-item-execution",
                    visible: isVisible(EntityType.ActionItemExecutionTask),
                },

            ]
        },
        {
            icon: reportIcon,
            title: context.$t("paperWork.reports.title"),
            items: [
                {
                    name: context.$t("paperWork.reports.incomingDocument"),
                    description: context.$t("paperWork.reports.incomingDocumentDescription"),
                    visible: isVisible(EntityType.ActionItemExecutionTask),
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Incoming",
                            popupTitle: 'paperWork.reports.incomingDocument'
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        },
                    }
                },
                {
                    name: context.$t("paperWork.reports.outgoingDocument"),
                    description: context.$t("paperWork.reports.outgoingDocumentDescription"),
                    visible: isVisible(EntityType.ActionItemExecutionTask),
                    params: 'incomingDocument',
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Outgoing",
                            popupTitle: 'paperWork.reports.outgoingDocument'
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        },
                    }
                },
                {
                    name: context.$t("paperWork.reports.internalDocument"),
                    description: context.$t("paperWork.reports.internalDocumentDescription"),
                    path: "/task/taskCategory/action-item-execution",
                    visible: isVisible(EntityType.ActionItemExecutionTask),
                    params: 'incomingDocument',
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Internal",
                            popupTitle: 'paperWork.reports.internalDocument'
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        },
                    }
                },

            ]
        },
    ];
    return paperWork;
}