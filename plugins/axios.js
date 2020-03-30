import { WebStorageStateStore } from "oidc-client";

export default function({ app, $axios }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  let refreshing = false;
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    if (code === 400) {
      // redirect('/400')
    }
    // else if (code === 401) {
    //   app.store.dispatch("oidc/authenticateOidcSilent");
    //   window.location.reload;
    // }
  });
  $axios.setHeader("Accept-Language", app.i18n.locale);
}
