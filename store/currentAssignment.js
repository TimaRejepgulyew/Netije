import AssignmentStatus from "~/infrastructure/constants/assignmentStatus";
import { isAssignment } from "~/infrastructure/constants/assignmentType.js";
import { isActionItemExicutionAssignment } from "~/infrastructure/constants/assignmentType.js";
import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/assignmentImportance";
export const state = () => ({
  assignment: null,
  comment: null
});

export const getters = {
  isCompleted({ assignment }) {
    return assignment.status === AssignmentStatus.Completed;
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
    return assignment.importance === Importance.Hight;
  },
  assignment({ assignment }) {
    return assignment;
  }
};
export const mutations = {
  RESET_FIELDS(state) {
    state.assignment = null;
    state.comment = null;
  },
  SET_ASSIGNMENT(state, payload) {
    state.assignment = payload;
  },
  SET_COMMENT(state, payload) {
    state.comment = payload;
  }
};

export const actions = {
  async markAsRead(actions, id) {
    await this.$axios.post(dataApi.assignment.MarkAsRead, {
      assignmentId: id
    });
  },
  async load({ commit, dispatch }, id) {
    commit("RESET_FIELDS");
    const { data } = await this.$axios.get(
      dataApi.assignment.GetAssignmentById + id
    );

    if (!data.isRead) {
      await dispatch("markAsRead", +id);
    }
    commit("SET_ASSIGNMENT", data);
  },
  async complete({ state, commit }, result) {
    const assignment = {
      assignmentId: state.assignment.id,
      comment: state.comment,
      result: result
    };

    return await this.$axios.post(
      dataApi.assignment.CompleteAssignment,
      assignment
    );
  }
};
