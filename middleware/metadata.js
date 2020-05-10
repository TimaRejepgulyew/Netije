export default async function ({ store}) {
  
    if (!store.getters["permissions/isPermissionsLoaded"] && store.getters["oidc/oidcUser"] != null) {
        console.log("loading metadata...")
        await store.dispatch("permissions/load")
    }
}