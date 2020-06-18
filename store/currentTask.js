import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";
export const state = () => ({
  task: {},
  isNew: null
});

export const getters = {
  taskType({ task }) {
    return task.taskType;
  },
  isNew({ isNew }) {
    return isNew;
  },
  isDraft({ task }) {
    console.log(task);
    return task.status === TaskStatus.Draft;
  },
  isCompleted({ task }) {
    return task.status === TaskStatus.Completed;
  },
  inProccess({ task }) {
    return task.status === TaskStatus.InProccess;
  },
  isAborted({ task }) {
    return task.status === TaskStatus.Aborted;
  },
  task({ task }) {
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
  SET_ACTION_ITEM_OBSERVERS(state, payload) {
    console.log(payload);
    state.task.actionItemObservers = payload;
  },
  SET_CO_ASSIGNEESS(state, payload) {
    console.log(payload);
    state.task.coAssigneess = payload;
  },
  SET_ASSIGNEE(state, payload) {
    console.log(payload);
    state.task.assigneeId = payload;
  },
  SET_SUPERVISOR(state, payload) {
    console.log(payload);
    state.task.supervisorId = payload;
  },
  SET_ACTION_ITEM(state, payload) {
    console.log(payload);
    state.task.actionItem = payload;
  },
  SET_IMPORTANCE(state, payload) {
    console.log(payload);
    state.task.importance = payload;
  }
};

export const actions = {
  async initTask({ commit }, params) {
    const { data } = await this.$axios.post(dataApi.task.CreateTask, params);
    console.log(data);
    commit("IS_NEW", true);
    commit("SET_TASK", data.task);
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
  async save({ state, commit }) {
    try {
      commit("IS_NEW", false);
      const task = JSON.stringify(state.task);
      await this.$axios.put(dataApi.task.UpdateTask + state.task.id, {
        taskJson: task,
        taskType: state.task.taskType
      });
    } catch (e) {
      console.log(e);
      commit("IS_NEW", true);
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
  async startAndLoad({ state, dispatch, getters }) {
    try {
      if (getters["isNew"]) {
        await dispatch("save");
      }
      await this.$axios.post(dataApi.task.Start, {
        id: state.task.id,
        type: state.task.taskType
      });
      await dispatch("load", getters("taskTypeAndId"));
    } catch (e) {
      console.log(e);
    }
  },
  async abort({ dispatch, getters }) {
    try {
      await this.$axios.put(dataApi.task.Abort);
      await dispatch("load", getters("taskTypeAndId"));
    } catch (e) {
      console.log(e);
    }
  },
  async restart({ dispatch, getters }) {
    try {
      await this.$axios.put(dataApi.task.Restart);
      await dispatch("load", getters("taskTypeAndId"));
    } catch (e) {
      console.log(e);
    }
  }
};
