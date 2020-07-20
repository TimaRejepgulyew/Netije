import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";

export const state = () => ({
  task: {},
  overlays: null,
  isNew: false,
  isDataChanged: false
});

export const getters = {
  overlays({ overlays }) {
    return overlays;
  },
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
    return state.task.status === TaskStatus.InProcess;
  },
  isAborted({ task }) {
    return task.status === TaskStatus.Aborted;
  },
  task({ task }) {
    return task;
  },

  taskTypeAndId({ task: { taskType, id } }) {
    console.log(taskType, id, "getters taskType and id");
    return {
      taskType,
      id
    };
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
    for (let item in payload) {
      state[item] = payload;
    }
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
  SET_BODY(state, payload) {
    if (checkDataChanged(state.task.body, payload)) state.isDataChanged = true;
    state.task.body = payload;
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
  SET_IMPORTANCE(state, payload) {
    if (checkDataChanged(state.task.importance, payload))
      state.isDataChanged = true;
    state.task.importance = payload;
  },
  SET_STATUS(state, payload) {
    state.task.status = payload;
  },
  SET_ATTACHMENT_GROUPS(state, payload) {
    state.task.attachmentGroups = payload;
  },
  SET_RESOLUTION_OBSERVERS(state, payload) {
    if (checkDataChanged(state.task.resolutionObservers, payload))
      state.isDataChanged = true;
    state.task.resolutionObservers = payload;
  },
  SET_ADDRESSEE_ID(state, payload) {
    if (checkDataChanged(state.task.addresseeId, payload))
      state.isDataChanged = true;
    state.task.addresseeId = payload;
  },
  INCREMENT_OVERLAY(state) {
    state.overlays++;
  },
  DECREMENT_OVERLAY(state) {
    state.overlays--;
  }
};

export const actions = {
  async saveAndLoad({ state, commit }) {
    const obj = { ...state.task };
    delete obj.attachmentGroups;
    const task = JSON.stringify(obj);
    const { data } = await this.$axios.put(dataApi.task.UpdateTask + obj.id, {
      taskJson: task,
      taskType: obj.taskType
    });

    commit("SET_TASK", data);
  },
  async delete({ state }) {
    await this.$axios.delete(dataApi.task.Delete + state.task.id);
  },
  async startAndLoad({ state, dispatch, getters }) {
    if (getters["isDataChanged"]) {
      await dispatch("saveAndLoad");
    }
    await this.$axios.post(dataApi.task.Start, {
      id: state.task.id,
      taskType: state.task.taskType
    });
  },
  async abort({ state }) {
    const res = await this.$axios.post(dataApi.task.Abort, {
      id: state.task.id,
      taskType: state.task.taskType
    });
    commit("SET_STATUS", TaskStatus.Abort);
  },
  async restart({ state }) {
    await this.$axios.post(dataApi.task.Restart, {
      id: state.task.id,
      taskType: state.task.taskType
    });
    commit("SET_STATUS", TaskStatus.Draft);
  },
  async pasteAttachment({ commit, state }, payload) {
    const options = { ...payload, id: state.task.id };
    const { data } = await this.$axios.post(
      dataApi.attachment.PasteByTask,
      options
    );
    commit("SET_ATTACHMENT_GROUPS", { key, payload: data });
  },
  async detachAttachment({ commit }, { key, payload }) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${payload}`
    );
    commit("SET_ATTACHMENT_GROUPS", data);
  },
};
