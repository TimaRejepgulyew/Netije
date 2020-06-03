import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from "~/infrastructure/constants/taskType.js";
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
  function generateUrl(typeGuid) {
    return `/task/create/${typeGuid}`;
  }

  return [
    {
      icon: "plus",
      text: context.$t("translations.fields.createSimpleTask"),
      path: generateUrl(TaskType.SimpleTask)
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createAcquaintanceTask"),
      path: generateUrl(TaskType.AcquaintanceTask)
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createActionTask"),
      path: generateUrl(TaskType.ActionItemExecutionTask)
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
      text: context.$t("translations.headers.incommingLetter"),
      path: generateUrl(DocumentType.IncommingDocument)
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      path: generateUrl(DocumentType.OutgoingDocument)
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
