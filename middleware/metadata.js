import clientNotification from "~/infrastructure/hubs/client-notification.js";
export default async function({ store, app }) {
  if (
    !store.getters["permissions/isPermissionsLoaded"] &&
    store.getters["oidc/oidcUser"] != null
  ) {
    await store.dispatch("permissions/load");
    const employeeId = store.getters[`permissions/employeeId`];
    const sendUserId = clientNotification(app);
    sendUserId(employeeId);
  }
}
