const ExecutionState = {
  OnReview: 0,
  Sending: 1,
  WithoutExecute: 2,
  OnExecution: 3,
  Executed: 4,
  Aborted: 5
};
export default ExecutionState;
export function ExecutionStateStore(context) {
  return [
    {
      id: ExecutionState.OnReview,
      name: context.$t("lifeCycleState.onReview")
    },
    {
      id: ExecutionState.Sending,
      name: context.$t("lifeCycleState.sending")
    },
    {
      id: ExecutionState.WithoutExecute,
      name: context.$t("lifeCycleState.withoutExecute")
    },
    {
      id: ExecutionState.OnExecution,
      name: context.$t("lifeCycleState.onExecution")
    },
    {
      id: ExecutionState.Executed,
      name: context.$t("lifeCycleState.executed")
    },
    {
      id: ExecutionState.Aborted,
      name: context.$t("lifeCycleState.aborted")
    }
  ];
}
