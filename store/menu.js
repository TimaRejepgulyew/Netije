export const state = () => ({
  whitespacePattern: /^[^\s]+$/,
  menuList(context) {
    return [
      {
        text: "Dasboard",
        path: "/home",
        icon: "home"
      },
      {
        text: context.$t("translations.menu.outgoing"),
        icon: "clock",

        items: [
          {
            text: context.$t("translations.menu.assignments"),
            path: "/task/assignments"
          }
        ]
      },
      {
        text: context.$t("translations.menu.incomming"),
        icon: "selectall",

        items: [
          {
            text: context.$t("translations.menu.task"),
            path: "/task"
          }
        ]
      },
      {
        text: context.$t("translations.menu.paperwork"),
        icon: "alignjustify",
        path: "/paper-work",

        items: [
          {
            text: context.$t("translations.menu.allDocument"),
            path: "/paper-work/all-documents"
          },
          {
            text: context.$t("translations.menu.incommingLetter"),
            path: "/paper-work/incomming-letter"
          },
          {
            text: context.$t("translations.menu.outgoingLetter"),
            path: "/paper-work/outgoing-letter"
          },

          {
            text: context.$t("translations.menu.order"),
            path: "/paper-work/order"
          },
          {
            text: context.$t("translations.menu.companyDirectives"),
            path: "/paper-work/company-directive"
          },
          {
            text: context.$t("translations.menu.simpleDocument"),
            path: "/paper-work/simple-document"
          },
          {
            text: context.$t("translations.menu.addendum"),
            path: "/paper-work/addendum"
          },
          {
            text: context.$t("translations.menu.memo"),
            path: "/paper-work/memo"
          },
          {
            text: context.$t("translations.menu.powerOfAttorney"),
            path: "/paper-work/power-of-attorney"
          }
        ]
      },
      {
        text: context.$t("translations.menu.contractors"),
        icon: "group",
        path: "/parties",
        items: [
          {
            text: context.$t("translations.menu.businessUnit"),
            icon: "fields",
            path: "/parties/organizations/businessUnit"
          },
          {
            text: context.$t("translations.menu.banks"),
            icon: "fields",
            path: "/parties/organizations/bank"
          },
          {
            text: context.$t("translations.menu.contacts"),
            icon: "fields",
            path: "/parties/organizations/contact"
          },
          {
            text: context.$t("translations.menu.counterPartList"),
            icon: "fields",
            path: "/parties/counterParts/"
          },
          {
            text: context.$t("translations.menu.person"),
            icon: "fields",
            path: "/parties/persons/"
          }
        ]
      },
      {
        text: context.$t("translations.menu.company-structure"),
        icon: "detailslayout",
        path: "/company",
        items: [
          {
            text: context.$t("translations.menu.businessUnit"),
            path: "/company/organizationStructure/businessUnits"
          },
          {
            text: context.$t("translations.menu.department"),
            path: "/company/organizationStructure/departments"
          },
          {
            text: context.$t("translations.menu.employee"),
            path: "/company/staff/employees"
          },
          {
            text: context.$t("translations.menu.post"),
            path: "/company/staff/jobTitles"
          },
          {
            text: context.$t("translations.menu.managersAssistant"),
            path: "/company/staff/managerAssistants"
          }
        ]
      },
      {
        text: context.$t("translations.menu.docFlow"),
        icon: "docfile",
        path: "/docFlow",
        items: [
          {
            text: context.$t("translations.menu.documentKind"),
            path: "/docFlow/document-kind",
            visible: context.$store.getters["permissions/allowReading"](
              "DocumentKind"
            )
          },
          {
            text: context.$t("translations.menu.documentRegistry"),
            path: "/docFlow/document-registration",
            visible: context.$store.getters["permissions/allowReading"](
              "DocumentRegister"
            )
          },
          {
            text: context.$t("translations.menu.registrationGroup"),
            path: "/docFlow/registration-group2",
            visible: context.$store.getters["permissions/allowReading"](
              "RegistrationGroup"
            )
          },
          {
            text: context.$t("translations.menu.caseFile"),
            path: "/docFlow/case-file/",
            visible: context.$store.getters["permissions/allowReading"](
              "CaseFile"
            )
          },
          {
            text: context.$t("translations.menu.fileRetentionPeriod"),
            path: "/docFlow/file-retention-period/"
          },
          {
            text: context.$t("translations.menu.mailDeliveryMethod"),
            path: "/docFlow/mail-delivery-method/",
            visible: context.$store.getters["permissions/allowReading"](
              "MailDeliveryMethod"
            )
          },
          {
            text: context.$t("translations.menu.associatedApp"),
            path: "/docFlow/associated-app",
            visible: context.$store.getters["permissions/allowReading"](
              "AssociatedApp"
            )
          },
          {
            text: context.$t("translations.menu.fileType"),
            path: "/docFlow/files-type",
            visible: context.$store.getters["permissions/allowReading"](
              "FilesType"
            )
          }
        ]
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
            visible: context.$store.getters["permissions/allowReading"](
              "Country"
            )
          },
          {
            text: context.$t("translations.menu.region"),
            icon: "isnotblank",
            path: "/shared-directory/territorialStructure/region",
            visible: context.$store.getters["permissions/allowReading"](
              "Region"
            )
          },
          {
            text: context.$t("translations.menu.locality"),
            icon: "isnotblank",
            path: "/shared-directory/territorialStructure/localities",
            visible: context.$store.getters["permissions/allowReading"](
              "Locality"
            )
          },
          {
            text: context.$t("translations.menu.currencies"),
            icon: "isnotblank",
            path: "/shared-directory/currencies",
            visible: context.$store.getters["permissions/allowReading"](
              "Currencies"
            )
          }
        ]
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
            visible: context.$store.getters["permissions/allowReading"]("Roles")
          }
        ]
      }
    ];
  }
});

export const getters = {
  menuList: ({ menuList }) => context => {
    return menuList(context);
  }
};
