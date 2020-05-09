import EntityType from '~/infrastructure/constants/entityTypes'

export const state = () => ({
  menuList(context) {
    return [
      {
        text: context.$t("menu.outgoing"),
        icon: "clock",

        items: [
          {
            text: context.$t("menu.assignments"),
            path: "/assignment"
          }
        ]
      },
      {
        text: context.$t("menu.incomming"),
        icon: "selectall",

        items: [
          {
            text: context.$t("menu.task"),
            path: "/task"
          }
        ]
      },
      {
        text: context.$t("menu.paperwork"),
        icon: "file",
        path: "/paper-work",

        items: [
          {
            text: context.$t("menu.allDocument"),
            path: "/paper-work/all-documents"
          },
          {
            text: context.$t("menu.incommingLetter"),
            path: "/paper-work/incomming-letter"
          },
          {
            text: context.$t("menu.outgoingLetter"),
            path: "/paper-work/outgoing-letter"
          },

          {
            text: context.$t("menu.order"),
            path: "/paper-work/order"
          },
          {
            text: context.$t("menu.companyDirectives"),
            path: "/paper-work/company-directive"
          },
          {
            text: context.$t("menu.simpleDocument"),
            path: "/paper-work/simple-document"
          },
          {
            text: context.$t("menu.addendum"),
            path: "/paper-work/addendum"
          },
          {
            text: context.$t("menu.memo"),
            path: "/paper-work/memo"
          },
          {
            text: context.$t("menu.powerOfAttorney"),
            path: "/paper-work/power-of-attorney"
          }
        ]
      },
      {
        text: context.$t("menu.contractors"),
        icon: "group",
        path: "/parties",
        visible: hasCounterPartyAccess(context),
        items: [
          {
            text: context.$t("menu.all"),
            path: "/parties/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("menu.companies"),
            path: "/parties/organizations/companies",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("menu.banks"),
            path: "/parties/organizations/banks",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("menu.person"),
            path: "/parties/persons/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Counterparty)
          },
          {
            text: context.$t("menu.contacts"),
            path: "/parties/organizations/contacts",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Contact)
          }
        ]
      },
      {
        text: context.$t("menu.company-structure"),
        icon: "hierarchy",
        visible: hasCompanyAccess(context),
        items: [
          {
            text: context.$t("menu.businessUnit"),
            path: "/company/organization-structure/business-units",
            visible: context.$store.getters["permissions/allowReading"](EntityType.BusinessUnit)
          },
          {
            text: context.$t("menu.department"),
            path: "/company/organization-structure/departments",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Department)
          },
          {
            text: context.$t("menu.employee"),
            path: "/company/staff/employees",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Employee)
          },
          {
            text: context.$t("menu.jobTitle"),
            path: "/company/job-titles",
            visible: context.$store.getters["permissions/allowReading"](EntityType.JobTitle)
          },
          {
            text: context.$t("menu.managersAssistant"),
            path: "/company/staff/managers-assistants",
            visible: context.$store.getters["permissions/allowReading"](EntityType.ManagersAssistant)
          }
        ]
      },
      {
        text: context.$t("menu.docFlow"),
        icon: "repeat",
        visible: hasDocflowAccess(context),
        items: [
          {
            text: context.$t("menu.documentKind"),
            path: "/docflow/document-kind",
            visible: context.$store.getters["permissions/allowReading"](EntityType.DocumentKind)
          },
          {
            text: context.$t("menu.documentRegistry"),
            path: "/docflow/document-register",
            visible: context.$store.getters["permissions/allowReading"](EntityType.DocumentRegister)
          },
          {
            text: context.$t("menu.registrationGroup"),
            path: "/docflow/registration-group",
            visible: context.$store.getters["permissions/allowReading"](EntityType.RegistrationGroup)
          },
          {
            text: context.$t("menu.caseFile"),
            path: "/docflow/case-files",
            visible: context.$store.getters["permissions/allowReading"](EntityType.CaseFile)
          },
          {
            text: context.$t("menu.fileRetentionPeriod"),
            path: "/docflow/file-retention-period/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.FileRetentionPeriod)
          },
          {
            text: context.$t("menu.mailDeliveryMethod"),
            path: "/docflow/mail-delivery-method/",
            visible: context.$store.getters["permissions/allowReading"](EntityType.MailDeliveryMethod)
          },
          {
            text: context.$t("menu.associatedApp"),
            path: "/docflow/associated-applications",
            visible: context.$store.getters["permissions/allowReading"](EntityType.AssociatedApplications)
          },
          {
            text: context.$t("menu.fileType"),
            path: "/docflow/files-type",
            visible: context.$store.getters["permissions/allowReading"](EntityType.FilesType)
          }
        ]
      },
      {
        text: context.$t("menu.shared-directory"),
        icon: "inactivefolder",
        visible: hasSharedDirectoryAccess(context),
        items: [
          {
            text: context.$t("menu.countries"),
            path: "/shared-directory/territorial-structure/countries",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Country)
          },
          {
            text: context.$t("menu.region"),
            path: "/shared-directory/territorial-structure/region",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Region)
          },
          {
            text: context.$t("menu.locality"),
            path: "/shared-directory/territorial-structure/localities",
            visible: context.$store.getters["permissions/allowReading"](EntityType.Locality)
          },
          {
            text: context.$t("menu.currencies"),
            path: "/shared-directory/currencies",
            //TODO: V2.0
            //visible: context.$store.getters["permissions/allowReading"](EntityType.Currencies)
            visible: false
          }
        ]
      },
      {
        text: context.$t("menu.administration"),
        icon: "preferences",
        visible: context.$store.getters["permissions/IsAdmin"],
        items: [
          {
            text: context.$t("menu.roles"),
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
