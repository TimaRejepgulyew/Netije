import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default function(context) {
  
}
export const ComponentsByAssignmentType = new Map([
  [AssignmentType.SimpleAssignment, { toolbar: "simple-assignment" }],
  [
    AssignmentType.AcquaintanceAssignment,
    {
      toolbar: "acquaintance-assignment",
      additional: "acquaintance-assignment-description"
    }
  ],
  [
    AssignmentType.ActionItemExecutionAssignment,
    { toolbar: "action-item-execution-assignment" }
  ],
  [
    AssignmentType.AcquaintanceFinishAssignment,
    { toolbar: "acquaintance-finish-assignment" }
  ],
  [
    AssignmentType.ActionItemSupervisorAssignment,
    { toolbar: "action-item-supervisor-assignment" }
  ],
  [AssignmentType.ReviewAssignment, { toolbar: "review-assignment" }],
  [
    AssignmentType.PreparingDraftResolutionAssignment,
    { toolbar: "preparing-draft-resolution-assignment" }
  ],
  [
    AssignmentType.ReviewDraftResolutionAssignment,
    { toolbar: "review-draft-resolutionA-assignment" }
  ],
  [
    AssignmentType.ReviewManagerAssignment,
    { toolbar: "review-manager-assignment" }
  ],
  [
    AssignmentType.ReviewResolutionAssignment,
    { toolbar: "review-resolution-assignment" }
  ]
]);
