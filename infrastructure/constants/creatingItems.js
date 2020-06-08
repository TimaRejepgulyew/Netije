import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from"~/infrastructure/constants/taskType.js"
export default function(context) {
  return [
    {
      text: context.$t("shared.documents"),
      icon: "file",
      items: DocumentButtons(context)
    },
    {
      text: context.$t("menu.task"),
      icon: "selectall",
      items: TaskButtons(context)
    }
  ];
}

export function TaskButtons(context) {

  return [
    {
      icon: "plus",
      text: context.$t("translations.fields.createSimpleTask"),
      path: "/task/simple/create"
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createAcquaintanceTask"),
      path: "/task/acquaintance/create"
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createActionTask"),
      path: "/task/action-item-execution/create"
    }
  ];
}

export function DocumentButtons(context) {
  function generateUrl(typeGuid) {
    return `/paper-work/create/${typeGuid}`;
  }

  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.IncomingLetter"),
      path: generateUrl(DocumentType.IncomingLetter)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      path: generateUrl(DocumentType.OutgoingLetter)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      path: generateUrl(DocumentType.Order)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      path: generateUrl(DocumentType.CompanyDirective)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      path: generateUrl(DocumentType.SimpleDocument)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      path: generateUrl(DocumentType.Addendum)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      path: generateUrl(DocumentType.Memo)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      path: generateUrl(DocumentType.PowerOfAttorney)
    }
  ];
}
