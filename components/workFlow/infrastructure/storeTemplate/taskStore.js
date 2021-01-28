import dataApi from "~/static/dataApi";
import TaskStatus from "../constants/taskStatus";
import TaskType from "../../infrastructure/constants/taskType";
export const state = () => ({
  task: {},
  canDelete: false,
  canUpdate: false,
  overlays: null,
  isNew: false,
  isDataChanged: false,
  skipRouteHandling: true
});
function replaceAssignee(state) {
  state.task.actionItemParts = [];
  if (state.task.deadline) state.task.finalDeadline = state.task.deadline;
  if (state.task.assignee)
    state.task.actionItemParts.push({
      assignee: state.task.assignee,
      actionItemPart: "",
      deadline: null
    });
  if (state.task.coAssignees)
    state.task.coAssignees.forEach(user => {
      state.task.actionItemParts.push({
        assignee: user,
        actionItemPart: "",
        deadline: null
      });
    });
}
export const getters = {
  canUpdate({ canUpdate }) {
    return canUpdate;
  },
  overlays({ overlays }) {
    return overlays;
  },
  skipRouteHandling({ skipRouteHandling }) {
    return skipRouteHandling;
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
  isUnderReview({ task }) {
    return task.status === TaskStatus.UnderReview;
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
  actionItemParts({ task }) {
    if (task.actionItemParts)
      return JSON.parse(JSON.stringify(task.actionItemParts));
  },
  taskTypeAndId({ task: { taskType, id } }) {
    return {
      taskType,
      id
    };
  },
  canDelete({ canDelete }) {
    return canDelete;
  }
};
function checkDataChanged(oldValue, newValue) {
  if (oldValue !== newValue) return oldValue !== newValue;
}
export const mutations = {
  CLEAN_STATE(state) {
    for (let prop in state) {
      state[prop] = null;
    }
    state = {};
  },
  SWITCH_TO_COMPOUND_ACTION_ITEM(state, payload) {
    if (payload) replaceAssignee(state);
    if (checkDataChanged(state.task.isCompoundActionItem, payload))
      state.isDataChanged = true;
    state.task.isCompoundActionItem = payload;
  },
  SET_ACTION_ITEM_PARTS(state, payload) {
    if (checkDataChanged(state.task.actionItemParts, payload))
      state.isDataChanged = true;
    state.task.actionItemParts = payload;
  },
  SET_FINAL_DEADLINE(state, payload) {
    if (checkDataChanged(state.task.finalDeadline, payload))
      state.isDataChanged = true;
    state.task.finalDeadline = payload;
  },
  SET_APPROVERS(state, payload) {
    if (checkDataChanged(state.task.approvers, payload))
      state.isDataChanged = true;
    state.task.approvers = payload;
  },
  SET_MAX_DEADLINE(state, payload) {
    if (checkDataChanged(state.task.maxDeadline, payload))
      state.isDataChanged = true;
    state.task.maxDeadline = payload;
  },
  SET_RECEIVE_NOTICE(state, payload) {
    if (checkDataChanged(state.task.receiveNotice, payload))
      state.isDataChanged = true;
    state.task.receiveNotice = payload;
  },
  SET_RECEIVE_ON_COMPLETION(state, payload) {
    if (checkDataChanged(state.task.receiveOnCompletion, payload))
      state.isDataChanged = true;
    state.task.receiveOnCompletion = payload;
  },
  SET_ASSIGNED_BY(state, payload) {
    if (checkDataChanged(state.task.assignedBy, payload))
      state.isDataChanged = true;
    state.task.assignedBy = payload;
  },
  SKIP_ROUTE_HANDLING(state, payload) {
    state.skipRouteHandling = payload;
  },
  SET_IS_DATA_CHANGED(state, payload) {
    state.isDataChanged = payload;
  },
  SET_TASK(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
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
    if (checkDataChanged(state.task.assignee, payload))
      state.isDataChanged = true;
    state.task.assignee = payload;
  },
  SET_SUPERVISOR(state, payload) {
    if (checkDataChanged(state.task.supervisor, payload))
      state.isDataChanged = true;
    state.task.supervisor = payload;
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
  SET_ADDRESSEE(state, payload) {
    if (checkDataChanged(state.task.addressee, payload))
      state.isDataChanged = true;
    state.task.addressee = payload;
  },
  INCREMENT_OVERLAYS(state) {
    if (state.overlays === null) {
      state.overlays = 0;
    } else state.overlays++;
  },
  DECREMENT_OVERLAYS(state) {
    state.overlays--;
  }
};

export const actions = {
  setBody({ commit, dispatch }, payload) {
    commit("SET_BODY", payload);
    dispatch("reevaluateTaskName");
  },
  async reevaluateTaskName({ state, commit }) {
    const { data } = await this.$axios.post(dataApi.task.ReevaluateTaskName, {
      ...state.task
    });
    commit("SET_SUBJECT", data);
  },
  async save({ state, commit }) {
    const obj = { ...state.task };
    delete obj.attachmentGroups;
    const task = JSON.stringify(obj);
    const { data } = await this.$axios.put(dataApi.task.UpdateTask + obj.id, {
      taskJson: task,
      taskType: obj.taskType
    });

    commit("SET_TASK", data);
    commit("IS_NEW", false);
    commit("SET_IS_DATA_CHANGED", false);
  },
  async delete({ state }) {
    await this.$axios.delete(dataApi.task.Delete + state.task.id);
  },
  async start({ state, commit }) {
    await this.$axios.post(dataApi.task.Start, {
      id: state.task.id,
      taskType: state.task.taskType
    });
    commit("SET_STATUS", TaskStatus.InProcess);
  },
  async abort({ state, commit }, params) {
    const { data } = await this.$axios.post(dataApi.task.Abort, {
      id: state.task.id,
      taskType: state.task.taskType,
      ...params
    });
    commit("SET_TASK", data);
  },
  async restart({ state, commit }) {
    const { data } = await this.$axios.post(dataApi.task.Restart, {
      id: state.task.id,
      taskType: state.task.taskType
    });
    commit("SET_TASK", data);
  },
  async pasteAttachment({ commit, dispatch, state }, payload) {
    const options = { ...payload, id: state.task.id };
    const { data } = await this.$axios.post(
      dataApi.attachment.PasteByTask,
      options
    );
    commit("SET_ATTACHMENT_GROUPS", data);
    switch (state.task.taskType) {
      case TaskType.SimpleTask:
        return;
      default:
        dispatch("reevaluateTaskName");
        break;
    }
  },
  async detachAttachment({ commit, state, dispatch }, payload) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${payload}`
    );
    commit("SET_ATTACHMENT_GROUPS", data);
    switch (state.task.taskType) {
      case TaskType.SimpleTask:
        return;
      default:
        dispatch("reevaluateTaskName");
        break;
    }
  }
};
