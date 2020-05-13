import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/assignmentImportance";
import TaskStatus from "~/infrastructure/constants/taskStatus";
export const state = () => ({
  task: null,
  reload: false
});

export const getters = {
  isCompleted({ task }) {
    return task.status === TaskStatus.Completed;
  },
  taskType({ task }) {
    return task.taskType;
  },
  reload({ reload }) {
    return reload;
  },
  isImportant({ task }) {
    return task.importance === Importance.High;
  },
  task({ task }) {
    return task;
  }
};
export const mutations = {
  RESET_FIELDS(state) {
    state.task = null;
  },
  SET_TASK(state, payload) {
    console.log(payload);
    state.task = payload;
  },
  RELOAD(state, payload) {
    state.reload = payload;
  }
};

export const actions = {
  async reload({ commit }, id) {
    commit("RELOAD", true);
    const { data } = await this.$axios.get(dataApi.task.GetTaskById + id);
    commit("RELOAD", false);
    commit("SET_TASK", data);
  },
  async load({ commit }, id) {
    commit("RESET_FIELDS");
    const { data } = await this.$axios.get(dataApi.task.GetTaskById + id);
    console.log(data);
    commit("SET_TASK", data);
  }
};
