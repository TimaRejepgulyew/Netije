const LifeCycleState = {
  Draft: 0,
  Active: 1,
  Obsolete: 2,
  Terminated: 3,
  Closed: 4
};
export default LifeCycleState;

export function lifeCycleStateStoreType1(context) {
  return [
    { id: LifeCycleState.Draft, name: context.$t("lifeCycleState.draft") },
    { id: LifeCycleState.Active, name: context.$t("lifeCycleState.active") },
    {
      id: LifeCycleState.Obsolete,
      name: context.$t("lifeCycleState.obsolete")
    }
  ];
}
export function lifeCycleStateStoreType2(context) {
  return [
    { id: LifeCycleState.Draft, name: context.$t("lifeCycleState.draft") },
    { id: LifeCycleState.Active, name: context.$t("lifeCycleState.active") },
    {
      id: LifeCycleState.Obsolete,
      name: context.$t("lifeCycleState.old")
    },
    {
      id: LifeCycleState.Terminated,
      name: context.$t("lifeCycleState.terminated")
    },
    { id: LifeCycleState.Closed, name: context.$t("lifeCycleState.closed") }
  ];
}
export function lifeCycleStateStoreContract(context) {
  return [
    { id: LifeCycleState.Draft, name: context.$t("lifeCycleState.draft") },
    { id: LifeCycleState.Active, name: context.$t("lifeCycleState.active") },
    {
      id: LifeCycleState.Obsolete,
      name: context.$t("lifeCycleStates.сanceled")
    },
    {
      id: LifeCycleState.Terminated,
      name: context.$t("lifeCycleState.terminated")
    },
    { id: LifeCycleState.Closed, name: context.$t("lifeCycleState.closed") }
  ];
}
export function lifeCycleStateStoreIncomingInvoice(context) {
  return [
    { id: LifeCycleState.Draft, name: context.$t("lifeCycleState.new") },
    {
      id: LifeCycleState.Active,
      name: context.$t("lifeCycleState.acceptedForPayment")
    },
    {
      id: LifeCycleState.Obsolete,
      name: context.$t("lifeCycleStates.paymentDenied")
    }
  ];
}
