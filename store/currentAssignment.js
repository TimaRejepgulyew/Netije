import AssignmentStatus from "~/infrastructure/constants/assignmentStatus";
import { isAssignment } from "~/infrastructure/constants/assignmentType.js";
import { isActionItemExicutionAssignment } from "~/infrastructure/constants/assignmentType.js";
import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/assignmentImportance";
export const state = () => ({
  assignments: {}
});

export const getters = {
  isCompleted: ({ assignments }) => key => {
    return assignments[key].assignment.status === AssignmentStatus.Completed;
  },
  inProcess: ({ assignments }) => key => {
    console.log(assignments, key);
    return assignments[key].assignment.status === AssignmentStatus.InProcess;
  },
  assignmentType: ({ assignments }) => key => {
    return assignments[key].assignment.assignmentType;
  },
  isActionItemExicutionAssignment: ({ assignments }) => key => {
    return isActionItemExicutionAssignment(
      assignments[key].assignment.assignmentType
    );
  },
  canUpdate: ({ assignments }) => key => {
    return (
      isAssignment(assignments[key].assignment.assignmentType) &&
      assignments[key].assignment.status !== AssignmentStatus.Completed
    );
  },
  isImportant: ({ assignments }) => key => {
    return assignments[key].assignment.importance === Importance.High;
  },
  assignment: ({ assignments }) => key => {
    return assignments[key].assignment;
  }
};
export const mutations = {
  SET_ASSIGNMENT(state, { key, payload }) {
    let overlays =
      state.assignments[key]?.overlays >= 0
        ? state.assignments[key].overlays
        : 0;
    const obj = {
      assignment: payload,
      overlays: overlays
    };
    var newObj = { ...state.assignments };
    newObj[key] = obj;
    state.assignments = Object.assign({}, state.assignments, newObj);
  },
  SET_BODY(state, { key, payload }) {
    state.assignments[key].body = payload;
  },
  SET_ATTACHMENT_GROUPS(state, { key, payload }) {
    state.assignments[key].assignment.attachmentGroups = payload;
  },
  SET_ADDRESSEE_ID(state, { key, payload }) {
    state.assignments[key].assignment.addresseeId = payload;
  },
  SET_RESULT(state, { key, payload }) {
    state.assignments[key].assignment.result = payload;
  }
};

export const actions = {
  async markAsRead(actions, id) {
    await this.$axios.post(dataApi.assignment.MarkAsRead, {
      assignmentId: id
    });
  },
  async load({ commit, dispatch }, { key }) {
    const { data } = await this.$axios.get(
      dataApi.assignment.GetAssignmentById + key
    );
    if (!data.isRead) {
      await dispatch("markAsRead", +key);
    }
    commit("SET_ASSIGNMENT", { key, payload: data });
  },
  async complete({ state }, { key, params }) {
    const assignment = { ...state.assignments[key].assignment };
    delete state.assignments[key].assignment.attachmentGroups;
    const assignmentJson = JSON.stringify(assignment);

    await this.$axios.post(dataApi.assignment.CompleteAssignment, {
      assignmentId: key,
      assignmentType: state.assignments[key].assignment.assignmentType,
      assignmentJson,
      ...params
    });
  },

  async pasteAttachment({ state, commit }, { key, payload }) {
    const options = { ...payload, id: key };
    const { data } = await this.$axios.post(
      dataApi.attachment.PasteByAssignment,
      options
    );
    commit("SET_ATTACHMENT_GROUPS", data);
  },
  async detachAttachment({ commit }, { key, payload }) {
    const { data } = await this.$axios.delete(
      `${dataApi.attachment.Detach}/${payload}`
    );
    commit("SET_ATTACHMENT_GROUPS", { key, payload: data });
  }
};
