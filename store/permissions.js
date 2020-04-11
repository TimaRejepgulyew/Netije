import entityTypes from "~/config/entityTypes";
export const state = () => ({
  accessRights: {},
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
    console.log(accessRights.operations);
    return accessRights.operations.get(entityTypes[entityType]).update;
  },
  allowReading: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin || accessRights.isAuditor) {
      return true;
    }

    return accessRights.operations.get(entityTypes[entityType]).read;
  },
  allowCreating: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin) {
      return true;
    }
    console.log(accessRights.operations);
    return accessRights.operations.get(entityTypes[entityType]).create;
  },
  allowDeleting: ({ accessRights }) => entityType => {
    if (accessRights.isAdmin) {
      return true;
    }

    return accessRights.operations.get(entityTypes[entityType]).delete;
  }
};
export const mutations = {
  PERMISSIONS(state, payload) {
    payload = JSON.parse(payload);
    const accessRights = {
      employeeId: payload.EmployeeId,
      isAdmin: payload.Roles.includes("Администраторы"),
      isAuditor: payload.Roles.includes("Аудиторы"),
      Roles: payload.Roles,
      operations: new Map(
        payload.AccessRights.map(({ entityType, operation }) => {
          let obj = { ...state.access.get(operation) };
          return [entityType, obj];
        })
      )
    };
    state.accessRights = accessRights;
  }
};
export const actions = {
  getPermissions({ commit }, payload) {
    commit("PERMISSIONS", payload);
  }
};
