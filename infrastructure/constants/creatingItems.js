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
      text: context.$t("translations.fields.createActionTask"),
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
      path: "/paper-work/incomming-letter/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      path: "/paper-work/outgoing-letter/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      path: "/paper-work/order/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      path: "/paper-work/company-directive/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      path: "/paper-work/simple-document/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      path: "/paper-work/addendum/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      path: "/paper-work/memo/add"
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      path: "/paper-work/power-of-attorney/add"
    }
  ];
}
