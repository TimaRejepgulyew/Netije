import dataApi from "~/static/dataApi";
class AccessOperation {
  constructor() {}
}
export const state = () => ({
  accessRights: {},
  isLoaded: false,
  access: new Map([
    [
      100,
      {
        delete: false,
        read: false,
        create: false,
        update: false
      }
    ],
    [
      90,
      {
        delete: true,
        read: true,
        create: true,
        update: true
      }
    ],
    [
      80,
      {
        delete: false,
        read: true,
        create: true,
        update: true
      }
    ],
    [
      70,
      {
        delete: false,
        read: true,
        create: true,
        update: false
      }
    ],
    [
      60,
      {
        delete: false,
        read: true,
        create: false,
        update: false
      }
    ],
    [
      0,
      {
        registration: true
      }
    ],

    [
      1,
      {
        deleteDocument: true
      }
    ],
    [
      2,
      {
        approval: true
      }
    ],
    [
      3,
      {
        execute: true
      }
    ],
    [
      4,
      {
        exchange: true
      }
    ]
  ])
});

export const getters = {
  employeeId({ accessRights }) {
    return accessRights.employeeId;
  },
  allowUpdating: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj) {
      return obj.update;
    }
    return false;
  },
  canExchange: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin || accessRights.isAuditor) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj?.exchange) return true;
    else return false;
  },
  canExecute: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin || accessRights.isAuditor) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj?.execute) return true
    else return false;
  },
  allowReading: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin || accessRights.isAuditor) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj) {
      return obj.read;
    }
    return false;
  },
  allowCreating: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj) {
      return obj.create;
    }
    return false;
  },
  allowDeleting: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin) {
      return true;
    }
    let obj = accessRights.operations.get(entityType);
    if (obj) {
      return obj.delete;
    }
    return false;
  },
  IsAdmin: ({ accessRights }) => {
    return accessRights.isAdmin;
  },
  isPermissionsLoaded: ({ isLoaded }) => {
    return isLoaded;
  },
  isResponsibleFinansicalArchive({ accessRights }) {
    if (accessRights.isAdmin) {
      return true;
    }
    return accessRights.isResponsibleForTheFinancialArchive;
  },
  isResponsibleForContracts({ accessRights }) {
    if (accessRights.isAdmin) {
      return true;
    }
    return accessRights.isResponsibleForContracts;
  },
  allowRegisterDocument: ({ accessRights }) => entityType => {
    return accessRights.operations.has(entityType);
  },
  isResponibleForCounterParts({ accessRights }) {
    if (accessRights.isAdmin) {
      return true;
    }
    return accessRights.isResponibleForCounterParts;
  },
  isResponsibleForRegistrationSettings({ accessRights }) {
    if (accessRights.isAdmin) {
      return true;
    }
    return accessRights.isResponsibleForRegistrationSettings;
  },
  isManagerAssistant({ accessRights }) {
    return accessRights.isManagerAssistant;
  },
  isClerk({ accessRights }) {
    return accessRights.isClerk;
  },
  isBusinessHead({ accessRights }) {
    return accessRights.isBusinessHead;
  },
  isDepartmentManager({ accessRights }) {
    return accessRights.isDepartmentManager;
  },
  isUser({ accessRights }) {
    return accessRights.isUser;
  }
};
export const mutations = {
  PERMISSIONS(state, payload) {
    const accessRights = {
      isManagerAssistant: payload.isManagerAssistant,
      isClerk: payload.roles.includes("Clerk"),
      isBusinessHead: payload.roles.includes("BusinessUnitHead"),
      isDepartmentManager: payload.roles.includes("DepartmentManager"),
      employeeId: payload.employeeId,
      isAdmin: payload.roles.includes("Admin"),
      isAuditor: payload.roles.includes("Auditor"),
      isResponsibleForTheFinancialArchive: payload.roles.includes(
        "ResponsibleForTheFinancialArchive"
      ),
      isUser: payload.roles.includes("User"),
      isResponsibleForContracts: payload.roles.includes(
        "ResponsibleForContracts"
      ),
      isResponibleForCounterParts: payload.roles.includes(
        "ResponsibleForCounterparts"
      ),
      isResponsibleForRegistrationSettings: payload.roles.includes(
        "ResponsibleForRegistrationSettings"
      ),
      Roles: payload.roles
    };
    const operations = new Map();
    payload.accessRights.forEach(({ entityType, operation }) => {
      let obj = { ...state.access.get(operation) };
      if (operations.has(entityType)) {
        const entry = operations.get(entityType);
        obj = { ...obj, ...entry };
      }
      operations.set(entityType, obj);
    });
    accessRights.operations = operations;
    state.accessRights = accessRights;
    state.isLoaded = true;
  }
};
export const actions = {
  async load({ commit, dispatch }) {
    var result = await this.$axios.get(dataApi.Metadata);
    commit("PERMISSIONS", result.data);
    dispatch("menu/initialize", {}, { root: true });
    dispatch(
      "user/initUser",
      {
        employeeId: result.data.employeeId,
        name: result.data.name,
        personalPhotoHash: result.data.personalPhotoHash
      },
      { root: true }
    );
  }
};
