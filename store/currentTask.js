import dataApi from "~/static/dataApi";
import TaskStatus from "~/infrastructure/constants/taskStatus";

export const state = () => ({
  tasks: {},
  guids: {}
});

export const getters = {
  isDataChanged: state => key => {
    return state.tasks[key].isDataChanged;
  },
  isNew: state => key => {
    if (state.tasks[key]) return state.tasks[key].isNew;
    else return false;
  },
  isDraft: state => key => {
    return state.tasks[key].task.status === TaskStatus.Draft;
  },
  isCompleted: state => key => {
    return state.tasks[key].task.status === TaskStatus.Completed;
  },
  inProcess: state => key => {
    return state.tasks[key].task.status === TaskStatus.InProcess;
  },
  isAborted: state => key => {
    return state.tasks[key].task.status === TaskStatus.Aborted;
  },
  task: state => key => {
    return state.tasks[key].task;
  },
  taskIdByGuid: state => key => {
    return state.guids[key].taskId;
  },
  taskTypeAndId: state => key => {
    return {
      taskType: state.tasks[key].task.taskType,
      id: state.tasks[key].task.id
    };
  }
};
function checkDataChanged(oldValue, newValue) {
  if (oldValue !== newValue) return oldValue !== newValue;
}
export const mutations = {
  SET_IS_DATA_CHANGED(state, { key, payload }) {
    state.tasks[key].isDataChanged = payload;
  },
  SET_TASK(state, { key, payload }) {
    let overlays =
      state.tasks[key]?.overlays >= 0 ? state.tasks[key].overlays : 0;
    const obj = {
      ...payload,
      isDataChanged: false,
      isNew: false,
      overlays: overlays
    };

    var newObj = { ...state.tasks };
    newObj[key] = obj;
    state.tasks = Object.assign({}, state.tasks, newObj);
  },
  DISPOSE(state, { key }) {
    delete state.tasks[key];
  },
  DROP_GUID(state, { key }) {
    delete state.guids[key];
  },
  SET_SUBJECT(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.subject, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.subject = payload;
  },
  SET_IS_UNDER_CONTROL(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.isUnderControl, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.isUnderControl = payload;
  },
  SET_MAX_DEADLINE(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.maxDeadline, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.maxDeadline = payload;
  },
  SET_DEADLINE(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.deadline, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.deadline = payload;
  },
  SET_BODY(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.body, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.body = payload;
  },
  SET_ROUTE_TYPE(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.routeType, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.routeType = payload;
  },
  SET_NEEDS_REVIEW(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.needsReview, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.needsReview = payload;
  },
  SET_PERFORMERS(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.performers, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.performers = payload;
  },
  SET_EXCLUDED_PERFORMERS(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.excludedPerformers, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.excludedPerformers = payload;
  },
  SET_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.observers, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.observers = payload;
  },
  IS_NEW(state, { key, payload }) {
    state.tasks[key].isNew = payload;
  },
  SET_IS_ELECTRONIC_ACQUAINTANCE(state, { key, payload }) {
    if (
      checkDataChanged(state.tasks[key].task.isElectronicAcquaintance, payload)
    )
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.isElectronicAcquaintance = payload;
  },
  SET_ACTION_ITEM_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.actionItemObservers, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.actionItemObservers = payload;
  },
  SET_CO_ASSIGNEES(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.coAssignees, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.coAssignees = payload;
  },
  SET_ASSIGNEE(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.assigneeId, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.assigneeId = payload;
  },
  SET_SUPERVISOR(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.supervisorId, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.supervisorId = payload;
  },
  SET_IMPORTANCE(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.importance, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.importance = payload;
  },
  SET_STATUS(state, { key, payload }) {
    state.tasks[key].task.status = payload;
  },
  SET_ATTACHMENT_GROUPS(state, { key, payload }) {
    state.tasks[key].task.attachmentGroups = payload;
  },
  SET_RESOLUTION_OBSERVERS(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.resolutionObservers, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.resolutionObservers = payload;
  },
  SET_ADDRESSEE_ID(state, { key, payload }) {
    if (checkDataChanged(state.tasks[key].task.addresseeId, payload))
      state.tasks[key].isDataChanged = true;
    state.tasks[key].task.addresseeId = payload;
  },
  ASSING_GUID(state, { key, taskId }) {
    state.guids[key] = { taskId };
  },
  INCREMENT_OVERLAY(state, { key }) {
    state.tasks[key].overlays++;
  },
  DECREMENT_OVERLAY(state, { key }) {
    state.tasks[key].overlays--;
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
  async load({ getters, state, commit }, { key, taskType }) {
    if (state.tasks[key]?.overlays >= 0) {
      commit("INCREMENT_OVERLAY", { key });
      return;
    }

    if (!getters["isNew"](key)) {
      const { data } = await this.$axios.get(
        `${dataApi.task.GetTaskById}${taskType}/${key}`
      );
      commit("SET_TASK", { key, payload: data });
    }
  },
  async saveAndLoad({ state, commit }, { key }) {
    const obj = { ...state.tasks[key].task };
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
      await dispatch("saveAndLoad", { key });
    }
    await this.$axios.post(dataApi.task.Start, {
      id: key,
      taskType: state.tasks[key].task.taskType
    });
  },
  async abort({ state }, { key }) {
    const res = await this.$axios.post(dataApi.task.Abort, {
      id: state.tasks[key].task.id,
      taskType: state.tasks[key].task.taskType
    });
    commit("SET_STATUS", { key, payload: TaskStatus.Abort });
  },
  async restart({ state }, { key }) {
    await this.$axios.post(dataApi.task.Restart, {
      id: state.tasks[key].task.id,
      taskType: state.tasks[key].task.taskType
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
  async detachAttachment({ commit }, { key, payload }) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${payload}`
    );
    commit("SET_ATTACHMENT_GROUPS", { key, payload: data });
  },
  dispose({ state, commit }, { key }) {
    commit("DECREMENT_OVERLAY", { key });
    if (state.tasks[key].overlays < 0) commit("DISPOSE", { key });
  }
};
