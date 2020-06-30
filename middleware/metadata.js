export default async function ({ store}) {
  
    if (!store.getters["permissions/isPermissionsLoaded"] && store.getters["oidc/oidcUser"] != null) {
        await store.dispatch("permissions/load")
    }
}