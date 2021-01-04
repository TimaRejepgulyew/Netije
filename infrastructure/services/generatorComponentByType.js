import AssignmentType from "~/components/workFlow/assignment-module/infrastructure/constans/assignmentType.js";
export default function(context) {}
export const ComponentsByAssignmentType = new Map([
  [
    AssignmentType.SimpleAssignment,
    { toolbar: "toolbar-simple-assignment", body: "body-simple-assignment" }
  ],
  [
    AssignmentType.AcquaintanceAssignment,
    {
      toolbar: "toolbar-acquaintance-assignment",
      additional: "additional-acquaintance-assignment-description",
      body: "body-acquaintance-assignment"
    }
  ],
  [
    AssignmentType.ActionItemExecutionAssignment,
    {
      toolbar: "toolbar-action-item-execution-assignment",
      body: "body-action-item-execution-assignment"
    }
  ],
  [
    AssignmentType.AcquaintanceFinishAssignment,
    {
      toolbar: "toolbar-acquaintance-finish-assignment",
      body: "body-acquaintance-finish-assignment"
    }
  ],
  [
    AssignmentType.ActionItemSupervisorAssignment,
    {
      toolbar: "toolbar-action-item-supervisor-assignment",
      body: "body-action-item-supervisor-assignment"
    }
  ],
  [AssignmentType.ReviewAssignment, { toolbar: "toolbar-review-assignment" }],
  [
    AssignmentType.PreparingDraftResolutionAssignment,
    {
      toolbar: "toolbar-preparing-draft-resolution-assignment",
      additional: "additional-preparing-draft-resolution-assignment",
      body: "bodyPreparingDraftResolutionAssignment"
    }
  ],
  [
    AssignmentType.ReviewDraftResolutionAssignment,
    {
      toolbar: "toolbar-review-draft-resolution-assignment",
      additional: "additionalReviewDraftResolutionAssignment",
      body: "bodyReviewDraftResolutionAssignment"
    }
  ],
  [
    AssignmentType.ReviewManagerAssignment,
    {
      toolbar: "toolbar-review-manager-assignment",
      additional: "additional-review-manager-assignment",
      body: "bodyReviewManagerAssignment"
    }
  ],
  [
    AssignmentType.ReviewResolutionAssignment,
    {
      toolbar: "toolbar-review-resolution-assignment",
      body: "bodyReviewResolutionAssignment"
    }
  ],
  [
    AssignmentType.FreeApprovalAssignment,
    {
      toolbar: "toolbar-free-approval-assignment",
      additional: "additional-free-approval-assignment",
      body: "body-free-approval-assignment"
    }
  ],
  [
    AssignmentType.FreeApprovalReworkAssignment,
    {
      toolbar: "toolbar-free-approval-rework-assignment",
      additional: "additional-free-approval-rework-assignment",
      body: "body-free-approval-rework-assignment"
    }
  ],
  [
    AssignmentType.FreeApprovalFinishAssignment,
    {
      toolbar: "toolbar-free-approval-finish-assignment",
      body: "body-free-approval-finish-assignment"
    }
  ]
]);
