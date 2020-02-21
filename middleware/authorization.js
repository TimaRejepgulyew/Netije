import oidc from "~/plugins/oidc-plugin";

export default async function(context) {
  const user = await oidc.getUser();
  if (user) {
    if (user.expired) {
      oidc.signinRedirect();
    } else {
      context.store.dispatch("profile-user/getUserName", user.profile.name);
    }
  } else {
    oidc.signinRedirect();
  }
}
