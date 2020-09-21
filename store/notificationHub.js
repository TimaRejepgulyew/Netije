export const state = () => ({
  assignmentNotification: []
});

export const getters = {
  assignmentNotificationCount: (
    { assignmentNotification }
  ) => assignmentQuery => {
    if (assignmentQuery !== undefined) {
      console.log(assignmentNotification.find((el) => el.query === assignmentQuery)?.count);
      return assignmentNotification.find((el) => el.query === assignmentQuery)?.count
    }

  },

};
export const mutations = {
  ASSIGNMENT_COUNTER_UPDATE(state, payload) {
    console.log(payload,"update notificcation");
    state.assignmentNotification = payload
  },


};
export const actions = {

};
