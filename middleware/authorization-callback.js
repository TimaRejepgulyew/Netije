export default async function ({ store, redirect, route }) {
    if (route.path == "/callback") {
        console.log("process authorization callback...")
        var redirectPath = await store.dispatch("oidc/oidcSignInCallback");
        redirect(redirectPath);
    }
}