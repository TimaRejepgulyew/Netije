import EntityType from "~/infrastructure/constants/entityTypes";
import DocumentFilterType from "~/infrastructure/constants/documentFilterType";
import financialArchiveIcon from "~/static/icons/financial-archive.svg";
import contractIcon from "~/static/icons/contract.svg";
export const state = () => ({
  menuList: []
});
export const hasContractAccess = rootGetters => {
  return rootGetters["permissions/isResponsibleForContracts"];
};
export const hasAccountingDocumentBaseAccess = rootGetters => {
  return rootGetters["permissions/isResponsibleFinansicalArchive"];
};
export const hasSharedDirectoryAccess = rootGetters => {
  return (
    rootGetters["permissions/allowReading"](EntityType.Country) ||
    rootGetters["permissions/allowReading"](EntityType.Region) ||
    rootGetters["permissions/allowReading"](EntityType.Locality)
  );
};

export const hasCounterPartyAccess = rootGetters => {
  return (
    rootGetters["permissions/allowReading"](EntityType.Counterparty) ||
    rootGetters["permissions/allowReading"](EntityType.Contact)
  );
};

export const hasCompanyAccess = rootGetters => {
  return (
    rootGetters["permissions/allowReading"](EntityType.ManagersAssistant) ||
    rootGetters["permissions/allowReading"](EntityType.JobTitle) ||
    rootGetters["permissions/allowReading"](EntityType.Employee) ||
    rootGetters["permissions/allowReading"](EntityType.Department) ||
    rootGetters["permissions/allowReading"](EntityType.BusinessUnit)
  );
};

export const hasDocflowAccess = rootGetters => {
  return (
    rootGetters["permissions/allowReading"](
      EntityType.AssociatedApplications
    ) ||
    rootGetters["permissions/allowReading"](EntityType.FilesType) ||
    rootGetters["permissions/allowReading"](EntityType.DocumentKind) ||
    rootGetters["permissions/allowReading"](EntityType.CaseFile) ||
    rootGetters["permissions/allowReading"](EntityType.FileRetentionPeriod) ||
    rootGetters["permissions/allowReading"](EntityType.DocumentRegister) ||
    rootGetters["permissions/allowReading"](EntityType.MailDeliveryMethod) ||
    rootGetters["permissions/allowReading"](EntityType.RegistrationGroup) ||
    rootGetters["permissions/allowReading"](EntityType.RegistrationSetting)
  );
};

export const getters = {
  menuList({ menuList }) {
    return menuList;
  }
};

export const mutations = {
  SET_MENU_ITEMS(state, payload) {
    state.menuList = payload;
  }
};
import AssignmentTypeFilters from "~/infrastructure/constants/assignmentTypeFilters.js";
export const actions = {
  initialize({ commit, rootGetters }) {
    const data = [
      {
        text: this.$i18n.t("menu.assignments"),
        icon: "clock",
        path: `/assignment/${AssignmentTypeFilters.all}`,
        items: [
          {
            text: this.$i18n.t("menu.onExicution"),
            path: `/assignment/${AssignmentTypeFilters.onExicution}`
          },
          {
            text: this.$i18n.t("menu.onReview"),
            path: `/assignment/${AssignmentTypeFilters.onReview}`
          },
          {
            text: this.$i18n.t("menu.onAcquaintance"),
            path: `/assignment/${AssignmentTypeFilters.onAcquaintance}`
          }
        ]
      },
      {
        text: this.$i18n.t("menu.task"),
        icon: "selectall",
        path: "/task"
      },

      {
        text: this.$i18n.t("menu.financial-archive"),
        icon: financialArchiveIcon,
        path: `/paper-work/${DocumentFilterType.AccountingDocuments}`,
        visible: hasAccountingDocumentBaseAccess(rootGetters),
        items: [
          // {
          //   text: this.$i18n.t("menu.incomingTaxInvoice"),
          //   path: `/paper-work/${DocumentFilterType.IncomingTaxInvoice}`
          // },
          // {
          //   text: this.$i18n.t("menu.outgoingTaxInvoice"),
          //   path: `/paper-work/${DocumentFilterType.OutgoingTaxInvoice}`
          // },
          // {
          //   text: this.$i18n.t("menu.universalTransferDocument"),
          //   path: `/paper-work/${DocumentFilterType.Universaltransferdocument}`
          // },
          // {
          //   text: this.$i18n.t("menu.waybill"),
          //   path: `/paper-work/${DocumentFilterType.Waybill}`
          // }
        ]
      },
      {
        text: this.$i18n.t("menu.contract"),
        icon: contractIcon,
        path: `/paper-work/${DocumentFilterType.ContractualDocuments}`,
        visible: hasContractAccess(rootGetters),
        items: [
          // {
          //   text: this.$i18n.t("menu.contract"),
          //   path: `/paper-work/${DocumentFilterType.Contract}`
          // },
          // {
          //   text: this.$i18n.t("menu.contractStatement"),
          //   path: `/paper-work/${DocumentFilterType.ContractStatement}`
          // },
          // {
          //   text: this.$i18n.t("menu.supAgreement"),
          //   path: `/paper-work/${DocumentFilterType.SupAgreement}`
          // },
          // {
          //   text: this.$i18n.t("menu.incomingInvoice"),
          //   path: `/paper-work/${DocumentFilterType.IncomingInvoice}`
          // }
        ]
      },
      {
        text: this.$i18n.t("menu.paperwork"),
        icon: "file",

        items: [
          {
            text: this.$i18n.t("menu.incommingDocuments"),
            path: `/paper-work/${DocumentFilterType.IncomingLetter}`
          },
          {
            text: this.$i18n.t("menu.outgoingDocuments"),
            path: `/paper-work/${DocumentFilterType.OutgoingLetter}`
          },
          {
            text: this.$i18n.t("menu.internalDocuments"),
            path: `/paper-work/${DocumentFilterType.InternalDocument}`,
            items: [
              {
                text: this.$i18n.t("menu.order"),
                path: `/paper-work/${DocumentFilterType.Order}`
              },
              {
                text: this.$i18n.t("menu.companyDirectives"),
                path: `/paper-work/${DocumentFilterType.CompanyDirective}`
              },
              {
                text: this.$i18n.t("menu.simpleDocument"),
                path: `/paper-work/${DocumentFilterType.SimpleDocument}`
              },
              {
                text: this.$i18n.t("menu.addendum"),
                path: `/paper-work/${DocumentFilterType.Addendum}`
              },
              {
                text: this.$i18n.t("menu.memo"),
                path: `/paper-work/${DocumentFilterType.Memo}`
              },
              {
                text: this.$i18n.t("menu.powerOfAttorney"),
                path: `/paper-work/${DocumentFilterType.PowerOfAttorney}`
              }
            ]
          }
        ]
      },
      {
        text: this.$i18n.t("menu.contractors"),
        icon: "group",
        visible: hasCounterPartyAccess(rootGetters),
        items: [
          {
            text: this.$i18n.t("menu.companies"),
            path: "/parties/organizations/companies",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Counterparty
            )
          },
          {
            text: this.$i18n.t("menu.contacts"),
            path: "/parties/organizations/contacts",
            visible: rootGetters["permissions/allowReading"](EntityType.Contact)
          },
          {
            text: this.$i18n.t("menu.person"),
            path: "/parties/persons/",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Counterparty
            )
          },
          {
            text: this.$i18n.t("menu.banks"),
            path: "/parties/organizations/banks",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Counterparty
            )
          }
        ]
      },
      {
        text: this.$i18n.t("menu.company-structure"),
        icon: "hierarchy",
        visible: hasCompanyAccess(rootGetters),
        items: [
          {
            text: this.$i18n.t("menu.employee"),
            path: "/company/staff/employees",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Employee
            )
          },
          {
            text: this.$i18n.t("menu.department"),
            path: "/company/organization-structure/departments",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Department
            )
          },
          {
            text: this.$i18n.t("menu.jobTitle"),
            path: "/company/job-titles",
            visible: rootGetters["permissions/allowReading"](
              EntityType.JobTitle
            )
          },
          {
            text: this.$i18n.t("menu.businessUnit"),
            path: "/company/organization-structure/business-units",
            visible: rootGetters["permissions/allowReading"](
              EntityType.BusinessUnit
            )
          },
          {
            text: this.$i18n.t("menu.managersAssistant"),
            path: "/company/staff/managers-assistants",
            visible: rootGetters["permissions/allowReading"](
              EntityType.ManagersAssistant
            )
          }
        ]
      },
      {
        text: this.$i18n.t("menu.docFlow"),
        icon: "repeat",
        path: "/docflow",
        visible: hasDocflowAccess(rootGetters),
        items: [
          {
            text: this.$i18n.t("menu.documentKind"),
            path: "/docflow/document-kind",
            visible: rootGetters["permissions/allowReading"](
              EntityType.DocumentKind
            )
          },
          {
            text: this.$i18n.t("menu.documentRegistry"),
            path: "/docflow/document-register",
            visible: rootGetters["permissions/allowReading"](
              EntityType.DocumentRegister
            )
          },
          {
            text: this.$i18n.t("menu.registrationGroup"),
            path: "/docflow/registration-group",
            visible: rootGetters["permissions/allowReading"](
              EntityType.RegistrationGroup
            )
          },
          {
            text: this.$i18n.t("menu.caseFile"),
            path: "/docflow/case-files",
            visible: rootGetters["permissions/allowReading"](
              EntityType.CaseFile
            )
          }
        ]
      },
      {
        text: this.$i18n.t("menu.shared-directory"),
        icon: "inactivefolder",
        visible: hasSharedDirectoryAccess(rootGetters),
        items: [
          {
            text: this.$i18n.t("menu.countries"),
            path: "/shared-directory/territorial-structure/countries",
            visible: rootGetters["permissions/allowReading"](EntityType.Country)
          },
          {
            text: this.$i18n.t("menu.region"),
            path: "/shared-directory/territorial-structure/region",
            visible: rootGetters["permissions/allowReading"](EntityType.Region)
          },
          {
            text: this.$i18n.t("menu.locality"),
            path: "/shared-directory/territorial-structure/localities",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Locality
            )
          },
          {
            text: this.$i18n.t("menu.currencies"),
            path: "/shared-directory/currencies",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Currencies
            )
          }
        ]
      },
      {
        text: this.$i18n.t("menu.administration"),
        icon: "preferences",
        visible: rootGetters["permissions/IsAdmin"],
        items: [
          {
            text: this.$i18n.t("menu.roles"),
            path: "/admin/roles"
          }
        ]
      }
    ];
    commit("SET_MENU_ITEMS", data);
  }
};
