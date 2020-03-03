export const state = () => ({
  userPermissions: {
    allowUpdating: true,
    allowAdding: true,
    allowDeleteing: true
  }
});

export const getters = {
    userPermissions(state) {
    return state.userPermissions;
  }
};
