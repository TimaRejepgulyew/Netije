export default async function({ store, redirect, route }) {
  if (route.path == "/callback") {
    const redirectPath = await store.dispatch("oidc/oidcSignInCallback");
    redirect(redirectPath);
  }
}
