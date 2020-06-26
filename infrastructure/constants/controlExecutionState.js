const controlExecutionState = {
  OnControl: 0,
  SpecialControl: 1,
  WithoutControl: 2,
  ControlRemoved: 3
};
export default controlExecutionState;
export function ControlExecutionStateStore(context) {
  return [
    {
      id: controlExecutionState.OnControl,
      name: context.$t("lifeCycleState.onControl")
    },

    {
      id: controlExecutionState.SpecialControl,
      name: context.$t("lifeCycleState.specialControl")
    },
    {
      id: controlExecutionState.WithoutControl,
      name: context.$t("lifeCycleState.withoutControl")
    },
    {
      id: controlExecutionState.ControlRemoved,
      name: context.$t("lifeCycleState.controlRemoved")
    }
  ];
}
