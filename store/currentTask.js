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
  isNew({ isNew }) {
    return isNew;
  },
  isDraft({ task }) {
    return task.status === TaskStatus.Draft;
  },
  task({ task }) {
    console.log(task);
    return task;
  },
  taskTypeAndId({ task }) {
    return { type: task.type, id: task.id };
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
  SET_PERFORMERS(state, payload) {
    console.log(payload);
    state.task.performers = payload;
  },
  SET_EXCLUDED_PERFORMERS(state, payload) {
    console.log(payload);
    state.task.excludePerformers = payload;
  },
  SET_OBSERVERS(state, payload) {
    console.log(payload);
    state.task.observers = payload;
  },
  IS_NEW(state, payload) {
    console.log(payload);
    state.isNew = payload;
  },
  SET_IS_ELECTRONIC_ACQUAINTANCE(state, payload) {
    console.log(payload);
    state.task.isElectronicAcquaintance = payload;
  },
};

export const actions = {
  initTask({ commit }, type) {
    // const { data } = this.$axios.get(dataApi.task.createTask + type);
    commit("IS_NEW", true);
    commit("SET_TASK", {
      id: 1,
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
  },
  async load({ getters, commit }, { type, id }) {
    console.log(getters["isNew"]);
    // if (!getters["isNew"]) {
    //   const { data } = await this.$axios.get(
    //     `${dataApi.task.GetTaskById}${type}/${id}`
    //   );
    //   commit("SET_TASK", data);
    //   commit("IS_NEW", false);
    // }
  },
  async save({ commit }) {
    try {
      commit("IS_NEW", false);
      await this.$axios.put(dataApi.task.Save);
    } catch (e) {
      console.log(e);
    }
  },
  async saveAndLoad({ dispatch, getters }) {
    try {
      await dispatch("save");
      await dispatch("load", getters("taskTypeAndId"));
    } catch (e) {
      console.log(e);
    }
  },
  async startAndLoad({ dispatch, getters }) {
    try {
      if (getters["isNew"]) {
        await dispatch("save");
      }
      await this.$axios.put(dataApi.task.Start);
      await dispatch("load", getters("taskTypeAndId"));
    } catch (e) {
      console.log(e);
    }
  }
};
