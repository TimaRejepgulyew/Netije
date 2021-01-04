import AssignmentStatus from "../constants/assignmentStatus";
import { isActionItemExicutionAssignment } from "../constants/assignmentType.js";
import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/taskImportance";
export const state = () => ({
  assignment: {},
  overlays: null,
  canUpdate: false
});

export const getters = {
  overlays({ overlays }) {
    return overlays;
  },
  isCompleted({ assignment }) {
    return assignment.status === AssignmentStatus.Completed;
  },
  inProcess({ assignment }) {
    return assignment.status === AssignmentStatus.InProcess;
  },
  assignmentType({ assignment }) {
    return assignment.assignmentType;
  },
  isActionItemExicutionAssignment({ assignment }) {
    return isActionItemExicutionAssignment(assignment.assignmentType);
  },
  canUpdate({ assignment, canUpdate }) {
    return assignment.status === AssignmentStatus.InProcess && canUpdate;
  },
  isImportant({ assignment }) {
    return assignment.importance === Importance.High;
  },
  assignment({ assignment }) {
    return assignment;
  },
  approvers(state) {
    if (state.assignment.approvers)
      return JSON.parse(JSON.stringify(state.assignment.approvers));
  }
};
export const mutations = {
  CLEAN_STATE(state) {
    for (let prop in state) {
      state[prop] = null;
    }
    state = {};
  },
  SET_STATUS(state, payload) {
    state.assignment.status = payload;
  },
  DECREMENT_OVERLAYS(state) {
    state.overlays--;
  },
  INCREMENT_OVERLAYS(state) {
    if (state.overlays === null) {
      state.overlays = 0;
    } else state.overlays++;
  },
  SET_ASSIGNMENT(state, payload) {
    for (let item in payload) {
      state[item] = payload[item];
    }
  },
  SET_APPROVERS(state, payload) {
    state.assignment.approvers = payload;
  },
  SET_BODY(state, payload) {
    state.assignment.body = payload;
  },
  SET_ATTACHMENT_GROUPS(state, payload) {
    state.assignment.attachmentGroups = payload;
  },
  SET_ADDRESSEE_ID(state, payload) {
    state.assignment.addresseeId = payload;
  },
  SET_RESULT(state, payload) {
    state.assignment.result = payload;
  },
  SET_NEW_DEADLINE(state, payload) {
    state.assignment.newDeadline = payload;
  },
  SET_NEED_ABORT_CHILD_ACTION_ITEMS(state, payload) {
    state.assignment.needAbortChildActionItems = payload;
  },
};

export const actions = {
  async markAsRead(actions, assignmentId) {
    await this.$axios.post(dataApi.assignment.MarkAsRead, {
      assignmentId
    });
  },
  async load({ commit, dispatch }, assignmentId) {
    const { data } = await this.$axios.get(
      dataApi.assignment.GetAssignmentById + assignmentId
    );
    if (!data.assignment.isRead && data.canUpdate) {
      await dispatch("markAsRead", +assignmentId);
    }
    commit("SET_ASSIGNMENT", data);
  },
  async reload({ commit, state }) {
    const body = state.assignment.body;
    const { data } = await this.$axios.get(
      dataApi.assignment.GetAssignmentById + state.assignment.id
    );
    data.assignment.body = body;
    commit("SET_ASSIGNMENT", data);
  },
  async complete({ state, commit, dispatch }, params) {
    const assignment = { ...state.assignment };
    delete assignment.attachmentGroups;
    const assignmentJson = JSON.stringify(assignment);
    await this.$axios.post(dataApi.assignment.CompleteAssignment, {
      assignmentId: state.assignment.id,
      assignmentType: state.assignment.assignmentType,
      assignmentJson,
      ...params
    });
    commit("SET_STATUS", AssignmentStatus.Completed);
    dispatch("reload");
  },

  async pasteAttachment({ state, commit }, payload) {
    const options = { ...payload, id: state.assignment.id };
    const { data } = await this.$axios.post(
      dataApi.attachment.PasteByAssignment,
      options
    );
    commit("SET_ATTACHMENT_GROUPS", data);
  },
  async detachAttachment({ commit }, payload) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${payload}`
    );
    commit("SET_ATTACHMENT_GROUPS", data);
  }
};
