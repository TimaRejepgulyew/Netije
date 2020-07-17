const controlExecutionState = {
  OnControl: 0,
  WithoutControl: 1
};
export default controlExecutionState;
export function ControlExecutionStateStore(context) {
  return [
    {
      id: controlExecutionState.OnControl,
      name: context.$t("lifeCycleState.onControl")
    },
    {
      id: controlExecutionState.WithoutControl,
      name: context.$t("lifeCycleState.withoutControl")
    }
  ];
}
