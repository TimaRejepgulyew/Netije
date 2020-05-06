import EntityType from '~/infrastructure/constants/entityTypes'

export const state = () => ({
  menuList(context) {
    return [
      {
        text: context.$t("translations.menu.outgoing"),
        icon: "clock",

        items: [
          {
            text: context.$t("translations.menu.assignments"),
            path: "/assignment"
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
        visible: hasCounterPartyAccess(context),
        items: [
          {
            text: context.$t("translations.menu.all"),
            icon: "fields",
            path: "/parties/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("translations.menu.companies"),
            icon: "fields",
            path: "/parties/organizations/companies",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("translations.menu.banks"),
            icon: "fields",
            path: "/parties/organizations/banks",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("translations.menu.person"),
            icon: "fields",
            path: "/parties/persons/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("translations.menu.contacts"),
            icon: "fields",
            path: "/parties/organizations/contacts",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Contact)
          }
        ]
      },
      {
        text: context.$t("translations.menu.company-structure"),
        icon: "detailslayout",
        visible: hasCompanyAccess(context),
        items: [
          {
            text: context.$t("translations.menu.businessUnit"),
            path: "/company/organization-structure/business-units",
            visible: context.$store.getters["permissions/allowReading"](EntityType.BusinessUnit)
          },
          {
            text: context.$t("translations.menu.department"),
            path: "/company/organization-structure/departments",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Department)
          },
          {
            text: context.$t("translations.menu.employee"),
            path: "/company/staff/employees",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Employee)
          },
          {
            text: context.$t("translations.menu.post"),
            path: "/company/job-titles",
            visible: context.$store.getters["permissions/allowReading"](EntityType.JobTitle)
          },
          {
            text: context.$t("translations.menu.managersAssistant"),
            path: "/company/staff/managers-assistants",
            visible: context.$store.getters["permissions/allowReading"](EntityType.ManagersAssistant)
          }
        ]
      },
      {
        text: context.$t("translations.menu.docFlow"),
        icon: "docfile",
        visible: hasDocflowAccess(context),
        items: [
          {
            text: context.$t("translations.menu.documentKind"),
            path: "/docflow/document-kind",
            visible: context.$store.getters["permissions/allowReading"](EntityType.DocumentKind)
          },
          {
            text: context.$t("translations.menu.documentRegistry"),
            path: "/docflow/document-registration",
            visible: context.$store.getters["permissions/allowReading"](EntityType.DocumentRegister)
          },
          {
            text: context.$t("translations.menu.registrationGroup"),
            path: "/docflow/registration-group",
            visible: context.$store.getters["permissions/allowReading"](EntityType.RegistrationGroup)
          },
          {
            text: context.$t("translations.menu.caseFile"),
            path: "/docflow/case-files",
            visible: context.$store.getters["permissions/allowReading"](EntityType.CaseFile)
          },
          {
            text: context.$t("translations.menu.fileRetentionPeriod"),
            path: "/docflow/file-retention-period/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.FileRetentionPeriod)
          },
          {
            text: context.$t("translations.menu.mailDeliveryMethod"),
            path: "/docflow/mail-delivery-method/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.MailDeliveryMethod)
          },
          {
            text: context.$t("translations.menu.associatedApp"),
            path: "/docflow/associated-applications",
            visible: context.$store.getters["permissions/allowReading"](EntityType.AssociatedApplications)
          },
          {
            text: context.$t("translations.menu.fileType"),
            path: "/docflow/files-type",
            visible: context.$store.getters["permissions/allowReading"](EntityType.FilesType)
          }
        ]
      },
      {
        text: context.$t("translations.menu.shared-directory"),
        icon: "docfile",
        visible: hasSharedDirectoryAccess(context),
        items: [
          {
            text: context.$t("translations.menu.countries"),
            icon: "isnotblank",
            path: "/shared-directory/territorial-structure/countries",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Country)
          },
          {
            text: context.$t("translations.menu.region"),
            icon: "isnotblank",
            path: "/shared-directory/territorial-structure/region",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Region)
          },
          {
            text: context.$t("translations.menu.locality"),
            icon: "isnotblank",
            path: "/shared-directory/territorial-structure/localities",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Locality)
          },
          {
            text: context.$t("translations.menu.Currencies"),
            icon: "isnotblank",
            path: "/shared-directory/currencies",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Currencies)
          }
        ]
      },
      {
        text: context.$t("translations.menu.administration"),
        icon: "admin",
        visible: context.$store.getters["permissions/IsAdmin"],
        items: [
          {
            text: context.$t("translations.menu.roles"),
            path: "/admin/roles",
            icon: "user"
          }
        ]
      }
    ];
  }
});

export const hasSharedDirectoryAccess = context => {
  return context.$store.getters["permissions/allowReading"](EntityType.Country) ||
    context.$store.getters["permissions/allowReading"](EntityType.Region) ||
    context.$store.getters["permissions/allowReading"](EntityType.Locality)
}

export const hasCounterPartyAccess = context => {
  return context.$store.getters["permissions/allowReading"](EntityType.Counterparty) ||
    context.$store.getters["permissions/allowReading"](EntityType.Contact)
}

export const hasCompanyAccess = context => {
  return context.$store.getters["permissions/allowReading"](EntityType.ManagersAssistant) ||
    context.$store.getters["permissions/allowReading"](EntityType.JobTitle) ||
    context.$store.getters["permissions/allowReading"](EntityType.Employee) ||
    context.$store.getters["permissions/allowReading"](EntityType.Department) ||
    context.$store.getters["permissions/allowReading"](EntityType.BusinessUnit);
}

export const hasDocflowAccess = context => {
  return context.$store.getters["permissions/allowReading"](EntityType.AssociatedApplications) ||
    context.$store.getters["permissions/allowReading"](EntityType.FilesType) ||
    context.$store.getters["permissions/allowReading"](EntityType.DocumentKind) ||
    context.$store.getters["permissions/allowReading"](EntityType.CaseFile) ||
    context.$store.getters["permissions/allowReading"](EntityType.FileRetentionPeriod) ||
    context.$store.getters["permissions/allowReading"](EntityType.DocumentRegister) ||
    context.$store.getters["permissions/allowReading"](EntityType.MailDeliveryMethod) ||
    context.$store.getters["permissions/allowReading"](EntityType.RegistrationGroup) ||
    context.$store.getters["permissions/allowReading"](EntityType.RegistrationSetting)
}



export const getters = {
  menuList: ({ menuList }) => context => {
    return menuList(context);
  }
};
