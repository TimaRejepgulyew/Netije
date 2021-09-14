import EntityType from "~/infrastructure/constants/entityTypes";
import assignmentMenuByRole
  from "~/components/workFlow/assignment-module/infrastructure/factory/assignmentMenuByRole.js";
import AssignmentQuery from "~/components/workFlow/infrastructure/constants/query/assignmentQuery.js";
import documentMenuByQuery from "~/infrastructure/services/documentModuleServices/menuDocumentByQuery.js"
export const state = () => ({
  menuList: []
});
export const hasCounterPartySettingAccess = rootGetters => {
  return rootGetters["permissions/isResponibleForCounterParts"];
};
export const hasRegistrationSettingAccess = rootGetters => {
  return rootGetters["permissions/isResponsibleForRegistrationSettings"];
};
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
    rootGetters["permissions/allowReading"](EntityType.DeliveryMethod) ||
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


export const actions = {
  initialize({ commit, rootGetters }) {
    const data = [
      {
        notificationType: "assignment",
        query: AssignmentQuery.All,
        template: "assignment-item",
        text: this.$i18n.t("menu.assignments"),
        icon: "clock",
        path: `/assignment/${AssignmentQuery.All}`,
        items: [...assignmentMenuByRole(this, rootGetters)]
      },
      {
        text: this.$i18n.t("menu.tasks"),
        icon: "selectall",
        path: "/task",
        items: [
          {
            text: this.$i18n.t("menu.actionItemExecutionTasks"),
            path: "/task/taskCategory/action-item-execution"
          },
          {
            text: this.$i18n.t("menu.approvals"),
            path: "/task/taskCategory/approvals"
          }
        ]
      },
      ...documentMenuByQuery(this, rootGetters),
      {
        text: this.$i18n.t("menu.contractors"),
        icon: "group",
        visible:
          hasCounterPartyAccess(rootGetters) &&
          hasCounterPartySettingAccess(rootGetters),
        path: "/parties",
        items: [
          {
            text: this.$i18n.t("menu.companies"),
            path: "/parties/company",
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
            path: "/parties/person",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Counterparty
            )
          },
          {
            text: this.$i18n.t("menu.banks"),
            path: "/parties/bank",
            visible: rootGetters["permissions/allowReading"](
              EntityType.Counterparty
            )
          }
        ]
      },
      {
        text: this.$i18n.t("menu.company-structure"),
        path: "/company",
        icon: "hierarchy",
        visible:
          hasCompanyAccess(rootGetters) && rootGetters["permissions/IsAdmin"],
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
            path: "/company/staff/managers-assistant",
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
        visible:
          hasDocflowAccess(rootGetters) &&
          hasRegistrationSettingAccess(rootGetters),
        items: [
          {
            text: this.$i18n.t("menu.documentKind"),
            path: "/docflow/document-kind",
            visible: rootGetters["permissions/allowReading"](
              EntityType.DocumentKind
            )
          },
          {
            text: this.$i18n.t("menu.documentRegister"),
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
        visible:
          hasSharedDirectoryAccess(rootGetters) &&
          hasCounterPartySettingAccess(rootGetters),
        path: "/shared-directory",
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
        path: "/admin",
        items: [
          {
            text: this.$i18n.t("menu.roles"),
            path: "/admin/roles"
          }
          // {
          //   text: this.$i18n.t("menu.logs"),
          //   path: "/admin/logs"
          // }
        ]
      },
      {
        text: this.$i18n.t("menu.chat"),
        icon: "message",
        visible: !rootGetters["permissions/IsAdmin"] && rootGetters["modulesConfig/getChat"],
},
    ];
    commit("SET_MENU_ITEMS", data);
  }
};
