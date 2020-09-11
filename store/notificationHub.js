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
  DELETE_ASSIGNMENT_NOTIFICATION(state, assignmentId) {
    state.assignmentNotification.filter((notify) => notify.assignmentId !== assignmentId)
  }

};
export const actions = {

};
