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
        has: false,
        read: false,
        create: false,
        update: false
      }
    ],
    [
      90,
      {
        delete: true,
        has: true,
        read: true,
        create: true,
        update: true
      }
    ],
    [
      80,
      {
        delete: false,
        has: true,
        read: true,
        create: true,
        update: true
      }
    ],
    [
      70,
      {
        delete: false,
        has: true,
        read: true,
        create: true,
        update: false
      }
    ],
    [
      60,
      {
        delete: false,
        has: true,
        read: true,
        create: false,
        update: false
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
    return accessRights.isResponsibleForTheFinancialArchive;
  },
  isResponsibleForContracts({ accessRights }) {
    return accessRights.isResponsibleForContracts;
  },
  allowRegisterDocument: ({ accessRights }) => entityType => {
    return accessRights.operations.has(entityType);
  }
};
export const mutations = {
  PERMISSIONS(state, payload) {
    const accessRights = {
      employeeId: payload.employeeId,
      isAdmin: payload.roles.includes("Admin"),
      isAuditor: payload.roles.includes("Auditor"),
      isResponsibleForTheFinancialArchive: payload.roles.includes(
        "ResponsibleForTheFinancialArchive"
      ),
      isResponsibleForContracts:payload.roles.includes(
        "ResponsibleForContracts"
      ),
      Roles: payload.roles,
      operations: new Map(
        payload.accessRights.map(({ entityType, operation }) => {
          let obj = { ...state.access.get(operation) };
          return [entityType, obj];
        })
      )
    };
    state.accessRights = accessRights;
    state.isLoaded = true;
  }
};
export const actions = {
  async load({ commit, dispatch }) {
    var result = await this.$axios.get(dataApi.Metadata);
    console.log(result);
    commit("PERMISSIONS", result.data);
    dispatch("menu/initialize", {}, { root: true });
    dispatch(
      "user/initUser",
      {
        employeeId: result.data.employeeId,
        name: result.data.name
      },
      { root: true }
    );
  }
};
