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
      name: context.$t("translations.fields.registered")
    },
    {
      id: RegistrationState.NotRegistered,
      name: context.$t("translations.fields.notRegistered")
    },
    {
      id: RegistrationState.Reserved,
      name: context.$t("translations.fields.reserved")
    }
  ];
}
