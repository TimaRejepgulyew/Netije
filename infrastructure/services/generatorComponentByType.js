import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default function(context) {}
export const ComponentsByAssignmentType = new Map([
  [AssignmentType.SimpleAssignment, { toolbar: "toolbar-simple-assignment" }],
  [
    AssignmentType.AcquaintanceAssignment,
    {
      toolbar: "toolbar-acquaintance-assignment",
      additional: "additional-acquaintance-assignment-description"
    }
  ],
  [
    AssignmentType.ActionItemExecutionAssignment,
    { toolbar: "toolbar-action-item-execution-assignment" }
  ],
  [
    AssignmentType.AcquaintanceFinishAssignment,
    { toolbar: "toolbar-acquaintance-finish-assignment" }
  ],
  [
    AssignmentType.ActionItemSupervisorAssignment,
    { toolbar: "toolbar-action-item-supervisor-assignment" }
  ],
  [AssignmentType.ReviewAssignment, { toolbar: "toolbar-review-assignment" }],
  [
    AssignmentType.PreparingDraftResolutionAssignment,
    {
      toolbar: "toolbar-preparing-draft-resolution-assignment",
      additional: "additional-preparing-draft-resolution-assignment"
    }
  ],
  [
    AssignmentType.ReviewDraftResolutionAssignment,
    { toolbar: "toolbar-review-draft-resolutionA-assignment" }
  ],
  [
    AssignmentType.ReviewManagerAssignment,
    { toolbar: "toolbar-review-manager-assignment" }
  ],
  [
    AssignmentType.ReviewResolutionAssignment,
    { toolbar: "toolbar-review-resolution-assignment" }
  ]
]);
