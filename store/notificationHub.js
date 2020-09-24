export const state = () => ({
  assignmentNotification: []
});

export const getters = {
  assignmentNotificationCount: (
    { assignmentNotification }
  ) => assignmentQuery => {
    if (assignmentQuery !== undefined) {
      return assignmentNotification.find((el) => el.query === assignmentQuery)?.count
    }

  },

};
export const mutations = {
  ASSIGNMENT_COUNTER_UPDATE(state, payload) {
    state.assignmentNotification = payload
  },


};
export const actions = {

};
