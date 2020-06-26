const InternalApprovalState = {
  OnApproval: 0,
  OnRework: 1,
  PendingSign: 2,
  Signed: 3,
  Aborted: 4,
  PendingReview: 5,
  Reviewed: 6
};
export default InternalApprovalState;
export function InternalApprovalStateStore(context) {
  return [
    {
      id: InternalApprovalState.OnApproval,
      name: context.$t("lifeCycleState.onApproval")
    },
    {
      id: InternalApprovalState.OnRework,
      name: context.$t("lifeCycleState.onRework")
    },
    {
      id: InternalApprovalState.PendingSign,
      name: context.$t("lifeCycleState.pendingSign")
    },
    {
      id: InternalApprovalState.Signed,
      name: context.$t("lifeCycleState.signed")
    },
    {
      id: InternalApprovalState.Aborted,
      name: context.$t("lifeCycleState.aborted")
    },
    {
      id: InternalApprovalState.PendingReview,
      name: context.$t("lifeCycleState.pendingReview")
    },
    {
      id: InternalApprovalState.Reviewed,
      name: context.$t("lifeCycleState.signed")
    }
  ];
}
