import DocumentType from "~/infrastructure/constants/documentType.js";
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
  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.incommingLetter"),
      path: `/paper-work/create/${DocumentType.IncommingDocument}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      path: `/paper-work/create/${DocumentType.OutgoingDocument}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      path: `/paper-work/create/${DocumentType.Order}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      path: `/paper-work/create/${DocumentType.CompanyDirective}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      path: `/paper-work/create/${DocumentType.SimpleDocument}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      path: `/paper-work/create/${DocumentType.Addendum}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      path: `/paper-work/create/${DocumentType.Memo}`
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      path: `/paper-work/create/${DocumentType.PowerOfAttorney}`
    }
  ];
}
