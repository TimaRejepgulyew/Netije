import AssignmentStatus from "~/infrastructure/constants/assignmentStatus";
import { isAssignment } from "~/infrastructure/constants/assignmentType.js";
import { isActionItemExicutionAssignment } from "~/infrastructure/constants/assignmentType.js";
import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/assignmentImportance";
export const state = () => ({
  assignment: {},
  overlays: null
});

export const getters = {
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
  canUpdate({ assignment }) {
    return (
      isAssignment(assignment.assignmentType) &&
      assignment.status !== AssignmentStatus.Completed
    );
  },
  isImportant({ assignment }) {
    return assignment.importance === Importance.High;
  },
  assignment({ assignment }) {
    return assignment;
  }
};
export const mutations = {
  SET_ASSIGNMENT(state, payload) {
    state.overlays = state.overlays >= 0 ? state.overlays : 0;
    state.assignment = payload;
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
  }
};

export const actions = {
  async markAsRead(actions, id) {
    await this.$axios.post(dataApi.assignment.MarkAsRead, {
      assignmentId: id
    });
  },
  async load({ commit, dispatch }, assignmentId) {
    const { data } = await this.$axios.get(
      dataApi.assignment.GetAssignmentById + assignmentId
    );
    if (!data.isRead) {
      await dispatch("markAsRead", +key);
    }
    commit("SET_ASSIGNMENT", data);
  },
  async complete({ state }, params) {
    const assignment = { ...state.assignment };
    delete state.assignment.attachmentGroups;
    const assignmentJson = JSON.stringify(assignment);

    await this.$axios.post(dataApi.assignment.CompleteAssignment, {
      assignmentId: state.assignment.id,
      assignmentType: state.assignment.assignmentType,
      assignmentJson,
      ...params
    });
  },

  async pasteAttachment({ state, commit }, payload ) {
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
