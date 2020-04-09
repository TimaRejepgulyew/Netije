export const state = () => ({
  whitespacePattern: /^[^\s]+$/,
  menuList(context) {
    console.log(
      context.$store.getters["permissions/employeeId"],
      "menu",
      context.$store.getters["permissions/accessRights"]
    );
    return [
      {
        text: "Dasboard",
        path: "/home",
        icon: "home",
      },
      {
        text: context.$t("translations.menu.assignments"),
        icon: "event",
        path: "/task/assignments/0",

        items: [
          {
            text: context.$t("translations.menu.simpleAssignments"),
            path: "/task/assignments/1",
          },
          {
            text: context.$t("translations.menu.acquaintanceAssignments"),
            path: "/task/assignments/2",
          },
          {
            text: context.$t("translations.menu.actionAssignments"),
            path: "/task/assignments/3",
          },
        ],
      },
      {
        text: context.$t("translations.menu.paperwork"),
        icon: "alignjustify",
        path: "/paper-work",

        items: [
          {
            text: context.$t("translations.menu.incommingLetter"),
            path: "/paper-work/incomming-letter",
            visible: context.$store.getters["permissions/accessRights"](405)
              .has,
          },
          {
            text: context.$t("translations.menu.outgoingLetter"),
            path: "/paper-work/outgoing-letter",
            visible: context.$store.getters["permissions/accessRights"](406)
              .has,
          },

          {
            text: context.$t("translations.menu.order"),
            path: "/paper-work/order",
            visible: context.$store.getters["permissions/accessRights"](410)
              .has,
          },
          {
            text: context.$t("translations.menu.companyDirectives"),
            path: "/paper-work/company-directive",
            visible: context.$store.getters["permissions/accessRights"](411)
              .has,
          },
          {
            text: context.$t("translations.menu.simpleDocument"),
            path: "/paper-work/simple-document",
            visible: context.$store.getters["permissions/accessRights"](409)
              .has,
          },
          {
            text: context.$t("translations.menu.addendum"),
            path: "/paper-work/addendum",
            visible: context.$store.getters["permissions/accessRights"](408)
              .has,
          },
          {
            text: context.$t("translations.menu.memo"),
            path: "/paper-work/memo",
            visible: context.$store.getters["permissions/accessRights"](412)
              .has,
          },
          {
            text: context.$t("translations.menu.powerOfAttorney"),
            path: "/paper-work/power-of-attorney",
            visible: context.$store.getters["permissions/accessRights"](407)
              .has,
          },
        ],
      },
      {
        text: context.$t("translations.menu.contractors"),
        icon: "group",
        path: "/parties",
        items: [
          {
            text: context.$t("translations.menu.businessUnit"),
            icon: "fields",
            path: "/parties/organizations/businessUnit",
            visible: context.$store.getters["permissions/accessRights"](200)
              .has,
          },
          {
            text: context.$t("translations.menu.banks"),
            icon: "fields",
            path: "/parties/organizations/bank",
            visible: context.$store.getters["permissions/accessRights"](200)
              .has,
          },
          {
            text: context.$t("translations.menu.contacts"),
            icon: "fields",
            path: "/parties/organizations/contact",
            visible: context.$store.getters["permissions/accessRights"](201)
              .has,
          },
          {
            text: context.$t("translations.menu.counterPartList"),
            icon: "fields",
            path: "/parties/counterParts/",
            visible: context.$store.getters["permissions/accessRights"](200)
              .has,
          },
          {
            text: context.$t("translations.menu.person"),
            icon: "fields",
            path: "/parties/persons/",
            visible: context.$store.getters["permissions/accessRights"](200)
              .has,
          },
        ],
      },
      {
        text: context.$t("translations.menu.company-structure"),
        icon: "detailslayout",
        path: "/company",
        items: [
          {
            text: context.$t("translations.menu.businessUnit"),
            path: "/company/organizationStructure/businessUnits",
            visible: context.$store.getters["permissions/accessRights"](100)
              .has,
          },
          {
            text: context.$t("translations.menu.department"),
            path: "/company/organizationStructure/departments",
            visible: context.$store.getters["permissions/accessRights"](101)
              .has,
          },
          {
            text: context.$t("translations.menu.employee"),
            path: "/company/staff/employees",
            visible: context.$store.getters["permissions/accessRights"](102)
              .has,
          },
          {
            text: context.$t("translations.menu.post"),
            path: "/company/staff/jobTitles",
            visible: context.$store.getters["permissions/accessRights"](103)
              .has,
          },
          {
            text: context.$t("translations.menu.managersAssistant"),
            path: "/company/staff/managerAssistants",
            visible: context.$store.getters["permissions/accessRights"](104)
              .has,
          },
        ],
      },
      {
        text: context.$t("translations.menu.docFlow"),
        icon: "docfile",
        path: "/docFlow",
        items: [
          {
            text: context.$t("translations.menu.documentKind"),
            path: "/docFlow/document-kind",
            visible: context.$store.getters["permissions/accessRights"](302)
              .has,
          },
          {
            text: context.$t("translations.menu.documentRegistry"),
            path: "/docFlow/document-registration",
            visible: context.$store.getters["permissions/accessRights"](305)
              .has,
          },
          {
            text: context.$t("translations.menu.registrationGroup"),
            path: "/docFlow/registration-group2",
            visible: context.$store.getters["permissions/accessRights"](307)
              .has,
          },
          {
            text: context.$t("translations.menu.caseFile"),
            path: "/docFlow/case-file/",
            visible: context.$store.getters["permissions/accessRights"](303)
              .has,
          },
          {
            text: context.$t("translations.menu.fileRetentionPeriod"),
            path: "/docFlow/file-retention-period/",
            visible: context.$store.getters["permissions/accessRights"](304)
              .has,
          },
          {
            text: context.$t("translations.menu.mailDeliveryMethod"),
            path: "/docFlow/mail-delivery-method/",
            visible: context.$store.getters["permissions/accessRights"](306)
              .has,
          },
          {
            text: context.$t("translations.menu.associatedApp"),
            path: "/docFlow/associated-app",
            visible: context.$store.getters["permissions/accessRights"](300)
              .has,
          },
          {
            text: context.$t("translations.menu.fileType"),
            path: "/docFlow/files-type",
            visible: context.$store.getters["permissions/accessRights"](301)
              .has,
          },
        ],
      },
      {
        text: context.$t("translations.menu.shared-directory"),
        icon: "docfile",
        path: "/shared-directory",
        items: [
          {
            text: context.$t("translations.menu.countries"),
            icon: "isnotblank",
            path: "/shared-directory/territorialStructure/countries",
            visible: context.$store.getters["permissions/accessRights"](0).has,
          },
          {
            text: context.$t("translations.menu.region"),
            icon: "isnotblank",
            path: "/shared-directory/territorialStructure/region",
            visible: context.$store.getters["permissions/accessRights"](1).has,
          },
          {
            text: context.$t("translations.menu.locality"),
            icon: "isnotblank",
            path: "/shared-directory/territorialStructure/localities",
            visible: context.$store.getters["permissions/accessRights"](2).has,
          },
          {
            text: context.$t("translations.menu.currencies"),
            icon: "isnotblank",
            path: "/shared-directory/currencies",
            visible: context.$store.getters["permissions/accessRights"](3).has,
          },
        ],
      },
      {
        text: context.$t("translations.menu.administration"),
        path: "/admin",
        icon: "admin",

        items: [
          {
            text: context.$t("translations.menu.roles"),
            path: "/admin/roles",
            icon: "user",
          },
        ],
      },
    ];
  },
});

export const getters = {
  menuList: ({ menuList }) => (context) => {
    return menuList(context);
  },
};
