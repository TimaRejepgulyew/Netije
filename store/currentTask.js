import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";

export const state = () => ({
  guids: {},
  task: {},
  isDataChanged: false,
  isNew: false
});

export const getters = {
  isDataChanged: state => key => {
    return state[key].isDataChanged;
  },
  isNew: state => key => {
    return state[key].isNew;
  },
  isDraft: state => key => {
    return state[key].task.status === TaskStatus.Draft;
  },
  isCompleted: state => key => {
    return state[key].task.status === TaskStatus.Completed;
  },
  inProcess: state => key => {
    return state[key].task.status === TaskStatus.InProcess;
  },
  isAborted: state => key => {
    return state[key].task.status === TaskStatus.Aborted;
  },
  task: state => key => {
    return state[key].task;
  },
  taskIdByGuid: state => key => {
    return state.guids[key].taskId;
  },
  taskTypeAndId: state => key => {
    return {
      taskType: state[key].task.taskType,
      id: state[key].task.id
    };
  }
};
function checkDataChanged(oldValue, newValue) {
  if (oldValue !== newValue) return oldValue !== newValue;
}
export const mutations = {
  SET_IS_DATA_CHANGED(state, { key, payload }) {
    state[key].isDataChanged = payload;
  },
  SET_TASK(state, { key, payload }) {
    const obj = {
      ...payload,
      isDataChanged: false,
      isNew: false
    };

    state[key] = Object.assign({}, state[key], obj);
  },
  DISPOSE(state, { key }) {
    delete state[key];
  },
  SET_SUBJECT(state, { key, payload }) {
    if (checkDataChanged(state[key].task.subject, payload))
      state[key].isDataChanged = true;
    state[key].task.subject = payload;
  },
  SET_IS_UNDER_CONTROL(state, { key, payload }) {
    if (checkDataChanged(state[key].task.isUnderControl, payload))
      state[key].isDataChanged = true;
    state[key].task.isUnderControl = payload;
  },
  SET_MAX_DEADLINE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.maxDeadline, payload))
      state[key].isDataChanged = true;
    state[key].task.maxDeadline = payload;
  },
  SET_DEADLINE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.deadline, payload))
      state[key].isDataChanged = true;
    state[key].task.deadline = payload;
  },
  SET_BODY(state, { key, payload }) {
    if (checkDataChanged(state[key].task.body, payload))
      state[key].isDataChanged = true;
    state[key].task.body = payload;
  },
  SET_ROUTE_TYPE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.routeType, payload))
      state[key].isDataChanged = true;
    state[key].task.routeType = payload;
  },
  SET_NEEDS_REVIEW(state, { key, payload }) {
    if (checkDataChanged(state[key].task.needsReview, payload))
      state[key].isDataChanged = true;
    state[key].task.needsReview = payload;
  },
  SET_PERFORMERS(state, { key, payload }) {
    if (checkDataChanged(state[key].task.performers, payload))
      state[key].isDataChanged = true;
    state[key].task.performers = payload;
  },
  SET_EXCLUDED_PERFORMERS(state, { key, payload }) {
    if (checkDataChanged(state[key].task.excludedPerformers, payload))
      state[key].isDataChanged = true;
    state[key].task.excludedPerformers = payload;
  },
  SET_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state[key].task.observers, payload))
      state[key].isDataChanged = true;
    state[key].task.observers = payload;
  },
  IS_NEW(state, { key, payload }) {
    state[key].isNew = payload;
  },
  SET_IS_ELECTRONIC_ACQUAINTANCE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.isElectronicAcquaintance, payload))
      state[key].isDataChanged = true;
    state[key].task.isElectronicAcquaintance = payload;
  },
  SET_ACTION_ITEM_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state[key].task.actionItemObservers, payload))
      state[key].isDataChanged = true;
    state[key].task.actionItemObservers = payload;
  },
  SET_CO_ASSIGNEES(state, { key, payload }) {
    if (checkDataChanged(state[key].task.coAssignees, payload))
      state[key].isDataChanged = true;
    state[key].task.coAssignees = payload;
  },
  SET_ASSIGNEE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.assigneeId, payload))
      state[key].isDataChanged = true;
    state[key].task.assigneeId = payload;
  },
  SET_SUPERVISOR(state, { key, payload }) {
    if (checkDataChanged(state[key].task.supervisorId, payload))
      state[key].isDataChanged = true;
    state[key].task.supervisorId = payload;
  },
  SET_IMPORTANCE(state, { key, payload }) {
    if (checkDataChanged(state[key].task.importance, payload))
      state[key].isDataChanged = true;
    state[key].task.importance = payload;
  },
  SET_STATUS(state, { key, payload }) {
    state[key].task.status = payload;
  },
  SET_ATTACHMENT_GROUPS(state, { key, payload }) {
    state[key].task.attachmentGroups = payload;
  },
  SET_RESOLUTION_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state[key].task.resolutionObservers, payload))
      state[key].isDataChanged = true;
    state[key].task.resolutionObservers = payload;
  },
  SET_ADDRESSEE_ID(state, { key, payload }) {
    if (checkDataChanged(state[key].task.addresseeId, payload))
      state[key].isDataChanged = true;
    state[key].task.addresseeId = payload;
  },
  ASSING_GUID(state, { key, taskId }) {
    state.guids[key] = { taskId };
  }
};

export const actions = {
  async initTask({ commit }, params) {
    const { data } = await this.$axios.post(dataApi.task.CreateTask, params);

    commit("ASSING_GUID", { key: params.guid, taskId: data.task.id });
    commit("SET_TASK", { key: data.task.id, payload: data });
    commit("SET_IS_DATA_CHANGED", { key: data.task.id, payload: true });
    commit("IS_NEW", { key: data.task.id, payload: true });
  },
  async load({ getters, commit }, { key, taskType }) {
    if (!getters["isNew"](key)) {
      const { data } = await this.$axios.get(
        `${dataApi.task.GetTaskById}${taskType}/${key}`
      );
      commit("SET_TASK", { key, payload: data });
    }
  },
  async saveAndLoad({ state, commit }, key) {
    const obj = { ...state[key].task };
    delete obj.attachmentGroups;
    const task = JSON.stringify(obj);
    const { data } = await this.$axios.put(dataApi.task.UpdateTask + obj.id, {
      taskJson: task,
      taskType: obj.taskType
    });

    commit("SET_TASK", { key: data.task.id, payload: data });
  },
  async delete({ state }, { key }) {
    await this.$axios.delete(dataApi.task.Delete + key);
  },
  async startAndLoad({ state, dispatch, getters }, { key }) {
    if (getters["isDataChanged"](key)) {
      await dispatch("saveAndLoad");
    }
    await this.$axios.post(dataApi.task.Start, {
      id: key,
      taskType: state[key].task.taskType
    });
  },
  async abort({ state }, { key }) {
    const res = await this.$axios.post(dataApi.task.Abort, {
      id: state[key].task.id,
      taskType: state[key].task.taskType
    });
    commit("SET_STATUS", { key, payload: TaskStatus.Abort });
  },
  async restart({ state }, { key }) {
    await this.$axios.post(dataApi.task.Restart, {
      id: state[key].task.id,
      taskType: state[key].task.taskType
    });
    commit("SET_STATUS", { key, payload: TaskStatus.Draft });
  },
  async pasteAttachment({ commit }, { key, payload }) {
    const options = { ...payload, id: key };
    const { data } = await this.$axios.post(
      dataApi.attachment.PasteByTask,
      options
    );
    commit("SET_ATTACHMENT_GROUPS", { key, payload: data });
  },
  async detachAttachment({ commit }, { key, attachmentId }) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${attachmentId}`
    );
    commit("SET_ATTACHMENT_GROUPS", { key, payload: data });
  }
};
