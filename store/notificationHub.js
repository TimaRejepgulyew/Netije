import assignmentQuery from "../infrastructure/constants/query/assignmentQuery";

export const state = () => ({
  assignmentNotification: [{ count: 5, query: 0, }, { count: 1, query: 1, }, { count: 3, query: 2, }, { count: 1, query: 2, }]
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
    state.assignmentNotification = payload
  },


};
export const actions = {

};
