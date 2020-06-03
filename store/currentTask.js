import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";
export const state = () => ({
  task: {},
  isNew: null
});

export const getters = {
  isCompleted({ task }) {
    return task.status === TaskStatus.Completed;
  },
  taskType({ task }) {
    return task.taskType;
  },
  isNew({ isNEw }) {
    return isNEw;
  },
  isDraft({ task }) {
    return task.status === TaskStatus.Draft;
  },
  task({ task }) {
    return task;
  }
};
export const mutations = {
  SET_TASK(state, payload) {
    console.log(payload);
    state.task = payload;
  },
  SET_SUBJECT(state, payload) {
    console.log(payload);
    state.task.subject = payload;
  },
  SET_DEADLINE(state, payload) {
    console.log(payload);
    state.task.deadline = payload;
  },
  SET_COMMENT(state, payload) {
    console.log(payload);
    state.task.comment;
  },
  SET_ROUTE_TYPE(state, payload) {
    console.log(payload);
    state.task.routeType = payload;
  },
  SET_NEEDS_REVIEW(state, payload) {
    console.log(payload);
    state.task.needsReview = payload;
  },
  SET_PERFORMER(state, payload) {
    console.log(payload);
    state.task.performers = payload;
  },
  SET_OBSERVERS(state, payload) {
    console.log(payload);
    state.task.observers = payload;
  },
  IS_NEW(state, payload) {
    console.log(payload);
    state.isNew = payload;
  }
};

export const actions = {
  async initTask({ commit }, type) {
    // const { data } = this.$axios.get(dataApi.task.createTask + type);

    commit("SER_TASK", {
      taskType: 1,
      status: 1,
      subject: null,
      importance: 0,
      needsReview: false,
      routeType: 0,
      deadline: null,
      observers: [],
      performers: [],
      attachments: [],
      comment: null
    });
    commit("IS_NEW", true);
  },
  async load({ getters, commit }, { type, id }) {
    if (!getters["isNew"]) {
      const { data } = await this.$axios.get(
        `${dataApi.task.GetTaskById}${type}/${id}`
      );
      commit("SET_TASK", data);
      commit("IS_NEW", false);
    }
  }
};
