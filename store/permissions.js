export const state = () => ({
  EmployeeId: null,
  Roles: [],
  AccessRights: [],
  access: new Map([
    [
      100,
      {
        delete: false,
        has: false,
        read: false,
        create: false,
        update: false,
      },
    ],
    [
      90,
      {
        delete: true,
        has: true,
        read: true,
        create: true,
        update: true,
      },
    ],
    [
      80,
      {
        delete: false,
        has: true,
        read: true,
        create: true,
        update: true,
      },
    ],
    [
      70,
      {
        delete: false,
        has: true,
        read: true,
        create: true,
        update: false,
      },
    ],
    [
      60,
      {
        delete: false,
        has: true,
        read: true,
        create: false,
        update: false,
      },
    ],
  ]),
});

export const getters = {
  employeeId({ EmployeeId }) {
    return EmployeeId;
  },
  roles({ Roles }) {
    return Roles;
  },

  accessRights: ({ AccessRights, Roles, access }) => (Key) => {
    if (Key !== undefined) {
      if (Roles == "Администраторы") {
        return {
          delete: true,
          has: true,
          read: true,
          create: true,
          update: true,
        };
      } else {
        const accessRight = AccessRights.find((el) => {
          return el.Key == Key;
        });
        if (accessRight) {
          return access.get(accessRight.Value);
        } else {
          // console.log(accessRight);
        }
        return {
          delete: true,
          has: true,
          read: true,
          create: true,
          update: true,
        };
      }
    } else {
      return AccessRights;
    }
  },
};
export const mutations = {
  PERMISSIONS(state, payload) {
    payload = JSON.parse(payload);
    for (let property in payload) {
      console.log(payload[property]);
      state[property] = payload[property];
    }
  },
};
export const actions = {
  getPermissions({ commit }, payload) {
    commit("PERMISSIONS", payload);
  },
};
