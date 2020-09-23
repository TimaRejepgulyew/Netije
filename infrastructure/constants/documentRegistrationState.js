const RegistrationState = {
  Registered: 0,
  NotRegistered: 1,
  Reserved: 2
};
export default RegistrationState;
export function RegistrationStateStore(context) {
  return [
    {
      id: RegistrationState.Registered,
      name: context.$t("docFlow.registrationState.registered")
    },
    {
      id: RegistrationState.NotRegistered,
      name: context.$t("docFlow.registrationState.notRegistered")
    },
    {
      id: RegistrationState.Reserved,
      name: context.$t("docFlow.registrationState.reserved")
    }
  ];
}
