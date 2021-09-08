import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import EntityType from "~/infrastructure/constants/entityTypes";
import controlIcon from "~/static/icons/quide-page/control.svg";
import reportIcon from "~/static/icons/quide-page/report-icon.svg";
import documentIcon from "~/static/icons/quide-page/documents.svg";
import personalSettingIcon from "~/static/icons/doc-flow-icon/personalSettingIcon.svg";

export default function(context) {
    function isVisible(accessKey) {
        return context.$store.getters["permissions/allowReading"](accessKey);
    }
    function hasAccess(accessKey) {
        return context.$store.getters["permissions/canExecute"](accessKey);
    }
    const pathGenerate = detail => {
        return `/document-module/${detail}`;
    };
    const paperWork = [
        {
            icon: personalSettingIcon,
            title: context.$t("docFlow.personalSetting.title"),
            items: [
                {
                    name: context.$t("docFlow.personalSetting.mySetting"),
                    description: context.$t(
                        "docFlow.personalSetting.mySettingDescr"
                    ),
                    path: pathGenerate("personal-settings"),
                    visible: true
                }
            ]
        },
        {
            icon: controlIcon,
            title: context.$t("paperWork.control.title"),
            items: [
                {
                    name: context.$t("paperWork.control.actionItemExicution"),
                    description: context.$t(
                        "paperWork.control.actionItemExicutionDescr"
                    ),
                    path: "/task/taskCategory/action-item-execution",
                    visible: isVisible(EntityType.ActionItemExecutionTask)
                }
            ]
        },
        {
            icon: documentIcon,
            title: context.$t("paperWork.documents.title"),
            items: [
                {
                    componentType: "document",
                    params: { query: DocumentQuery.IncomingLetter },
                    name: context.$t("paperWork.documents.incomingLetter"),
                    description: context.$t(
                        "paperWork.documents.incomingLetterDescr"
                    ),
                    path: pathGenerate(DocumentQuery.IncomingLetter),
                    visible: isVisible(EntityType.IncomingLetter)
                },
                {
                    componentType: "document",
                    params: { query: DocumentQuery.OutgoingLetter },
                    name: context.$t("paperWork.documents.outgoingLetter"),
                    description: context.$t(
                        "paperWork.documents.outgoingLetterDescr"
                    ),
                    visible: isVisible(EntityType.OutgoingLetter),
                    path: pathGenerate(DocumentQuery.OutgoingLetter)
                },
                {
                    componentType: "document",
                    params: { query: DocumentQuery.InternalDocuments },
                    name: context.$t("paperWork.documents.internalDocuments"),
                    description: context.$t(
                        "paperWork.documents.internalDocumentsDescr"
                    ),
                    visible: true,
                    path: pathGenerate(DocumentQuery.InternalDocuments)
                },
                {
                    name: context.$t("paperWork.documents.dynamicDocument"),
                    description: context.$t(
                        "paperWork.documents.dynamicDocumentDescr"
                    ),
                    visible:
                        context.$store.getters[
                            "modulesConfig/getDynamicDocuments"
                        ],
                    path: pathGenerate(DocumentQuery.DynamicDocument)
                }
            ]
        },

        {
            icon: reportIcon,
            title: context.$t("paperWork.reports.title"),
            items: [
                {
                    name: context.$t("paperWork.reports.incomingDocument"),
                    description: context.$t(
                        "paperWork.reports.incomingDocumentDescription"
                    ),
                    visible: hasAccess(
                        EntityType.IncomingDocumentRegisterReport
                    ),
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Incoming",
                            popupTitle: "paperWork.reports.incomingDocument"
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        }
                    }
                },
                {
                    name: context.$t("paperWork.reports.outgoingDocument"),
                    description: context.$t(
                        "paperWork.reports.outgoingDocumentDescription"
                    ),
                    visible: hasAccess(
                        EntityType.OutgoingDocumentRegisterReport
                    ),
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Outgoing",
                            popupTitle: "paperWork.reports.outgoingDocument"
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        }
                    }
                },
                {
                    name: context.$t("paperWork.reports.internalDocuments"),
                    description: context.$t(
                        "paperWork.reports.internalDocumentsDescription"
                    ),
                    visible: hasAccess(EntityType.InnerDocumentRegisterReport),
                    componentType: "popup",
                    params: {
                        popupName: "documentReports",
                        options: {
                            reportId: "Internal",
                            popupTitle: "paperWork.reports.internalDocuments"
                        },
                        popupOptions: {
                            showLoadingPanel: false,
                            height: "auto",
                            width: "auto"
                        }
                    }
                }
            ]
        }
    ];
    return paperWork;
}
