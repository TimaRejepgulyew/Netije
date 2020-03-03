export const state = () => ({
  userPermissions: {
    allowUpdating: true,
    allowAdding: false,
    allowDeleteing: false
  }
});

export const getters = {
    userPermissions(state) {
    return state.userPermissions;
  }
};
