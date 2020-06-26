const ExternalApprovalState = {
  OnApproval: 0,
  Signed: 1,
  Unsigned: 2
};
export default ExternalApprovalState;
export function ExternalApprovalStateStore(context) {
  return [
    {
      id: ExternalApprovalState.OnApproval,
      name: context.$t("lifeCycleState.onApproval")
    },

    {
      id: ExternalApprovalState.Signed,
      name: context.$t("lifeCycleState.signed")
    },
    {
      id: ExternalApprovalState.Unsigned,
      name: context.$t("lifeCycleState.unsigned")
    }
  ];
}
