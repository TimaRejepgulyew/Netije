export const state = () => ({
  assignmentNotification: []
});

export const getters = {
  assignmentNotificationCount({ assignmentNotification }) {
    return assignmentNotification.length
  },
  assignmentNotification({ assignmentNotification }) {
    return assignmentNotification
  }
};
export const mutations = {
  SET_ASSIGNMENT_NOTIFICATION(state, payload) {
    state.assignmentNotification.unshift(payload)
  },
  DELETE_ASSIGNMENT_NOTIFICATION(state, payload) {
    state.assignmentNotification = state.assignmentNotification.filter((notify) => notify.assignmentId !== payload)
  }

};
export const actions = {

};
