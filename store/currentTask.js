import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";

export const state = () => ({
  task: {},
  isDataChanged: false,
  isNew: false
});

export const getters = {
  isDataChanged({ isDataChanged }) {
    return isDataChanged;
  },
  isNew({ isNew }) {
    return isNew;
  },
  isDraft({ task }) {
    return task.status === TaskStatus.Draft;
  },
  isCompleted({ task }) {
    return task.status === TaskStatus.Completed;
  },
  inProcess({ task }) {
    return task.status === TaskStatus.InProcess;
  },
  isAborted({ task }) {
    return task.status === TaskStatus.Aborted;
  },
  task({ task }) {
    return task;
  },
  taskTypeAndId({ task: { taskType, id } }) {
    return { taskType, id };
  }
};
function checkDataChanged(oldValue, newValue) {
  if (oldValue !== newValue) return oldValue !== newValue;
}
export const mutations = {
  SET_IS_DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  },
  SET_TASK(state, payload) {
    state.task = payload;
  },
  SET_SUBJECT(state, payload) {
    if (checkDataChanged(state.task.subject, payload))
      state.isDataChanged = true;
    state.task.subject = payload;
  },
  SET_IS_UNDER_CONTROL(state, payload) {
    if (checkDataChanged(state.task.isUnderControl, payload))
      state.isDataChanged = true;
    state.task.isUnderControl = payload;
  },
  SET_MAX_DEADLINE(state, payload) {
    if (checkDataChanged(state.task.maxDeadline, payload))
      state.isDataChanged = true;
    state.task.maxDeadline = payload;
  },
  SET_DEADLINE(state, payload) {
    if (checkDataChanged(state.task.deadline, payload))
      state.isDataChanged = true;
    state.task.deadline = payload;
  },
  SET_COMMENT(state, payload) {
    if (checkDataChanged(state.task.comment, payload))
      state.isDataChanged = true;
    state.task.comment = payload;
  },
  SET_ROUTE_TYPE(state, payload) {
    if (checkDataChanged(state.task.routeType, payload))
      state.isDataChanged = true;
    state.task.routeType = payload;
  },
  SET_NEEDS_REVIEW(state, payload) {
    if (checkDataChanged(state.task.needsReview, payload))
      state.isDataChanged = true;
    state.task.needsReview = payload;
  },
  SET_PERFORMERS(state, payload) {
    if (checkDataChanged(state.task.performers, payload))
      state.isDataChanged = true;
    state.task.performers = payload;
  },
  SET_EXCLUDED_PERFORMERS(state, payload) {
    if (checkDataChanged(state.task.excludedPerformers, payload))
      state.isDataChanged = true;
    state.task.excludedPerformers = payload;
  },
  SET_OBSERVERS(state, payload) {
    if (checkDataChanged(state.task.observers, payload))
      state.isDataChanged = true;
    state.task.observers = payload;
  },
  IS_NEW(state, payload) {
    state.isNew = payload;
  },
  SET_IS_ELECTRONIC_ACQUAINTANCE(state, payload) {
    if (checkDataChanged(state.task.isElectronicAcquaintance, payload))
      state.isDataChanged = true;
    state.task.isElectronicAcquaintance = payload;
  },
  SET_ACTION_ITEM_OBSERVERS(state, payload) {
    if (checkDataChanged(state.task.actionItemObservers, payload))
      state.isDataChanged = true;
    state.task.actionItemObservers = payload;
  },
  SET_CO_ASSIGNEES(state, payload) {
    if (checkDataChanged(state.task.coAssignees, payload))
      state.isDataChanged = true;
    state.task.coAssignees = payload;
    console.log(state.task.coAssignees, payload);
  },
  SET_ASSIGNEE(state, payload) {
    if (checkDataChanged(state.task.assigneeId, payload))
      state.isDataChanged = true;
    state.task.assigneeId = payload;
  },
  SET_SUPERVISOR(state, payload) {
    if (checkDataChanged(state.task.supervisorId, payload))
      state.isDataChanged = true;
    state.task.supervisorId = payload;
  },
  SET_ACTION_ITEM(state, payload) {
    if (checkDataChanged(state.task.actionItem, payload))
      state.isDataChanged = true;
    state.task.actionItem = payload;
  },
  SET_IMPORTANCE(state, payload) {
    if (checkDataChanged(state.task.importance, payload))
      state.isDataChanged = true;
    state.task.importance = payload;
  },
  SET_STATUS(state, payload) {
    state.task.status = payload;
  },
  SET_ATTACHMENT_GROUP(state, payload) {
    state.task.attachmentsGroup = payload;
  }
};

export const actions = {
  async initTask({ commit }, params) {
    const { data } = await this.$axios.post(dataApi.task.CreateTask, params);
    commit("SET_IS_DATA_CHANGED", true);
    commit("IS_NEW", true);
    commit("SET_TASK", data.task);
  },
  async load({ getters, commit }, { taskType, id }) {
    if (!getters["isNew"]) {
      const { data } = await this.$axios.get(
        `${dataApi.task.GetTaskById}${taskType}/${id}`
      );
      console.log(data, "load");
      commit("SET_TASK", data);
    }
  },
  async saveAndLoad({ state, commit }) {
    try {
      const task = JSON.stringify(state.task);
      const { data } = await this.$axios.put(
        dataApi.task.UpdateTask + state.task.id,
        {
          taskJson: task,
          taskType: state.task.taskType
        }
      );
      commit("SET_TASK", data.task);
      commit("SET_IS_DATA_CHANGED", false);
    } catch (e) {
      console.log(e);
    }
  },
  async delete({ state }) {
    await this.$axios.delete(dataApi.task.Delete + state.task.id);
  },
  async startAndLoad({ state, dispatch, getters }) {
    try {
      if (getters["isNew"]) {
        await dispatch("saveAndLoad");
      }
      await this.$axios.post(dataApi.task.Start, {
        id: state.task.id,
        taskType: state.task.taskType
      });
      commit("SET_STATUS", TaskStatus.InProcess);
    } catch (e) {
      console.log(e);
    }
  },
  async abort({ dispatch, getters }) {
    try {
      const res = await this.$axios.post(
        dataApi.task.Abort,
        getters["taskTypeAndId"]
      );
      commit("SET_STATUS", TaskStatus.Abort);
    } catch (e) {}
  },
  async restart({ dispatch, getters }) {
    try {
      await this.$axios.post(dataApi.task.Restart, getters["taskTypeAndId"]);
      commit("SET_STATUS", TaskStatus.Draft);
    } catch (e) {}
  },
  async pasteAttachment({ state, commit }, payload) {
    const options = { ...payload, id: state.task.id, };
    console.log(options);
    const attachmentsGroup = await this.$axios.post(dataApi.task.Paste, options);
    commit("SET_ATTACHMENT_GROUP", attachmentsGroup);
  }
};
