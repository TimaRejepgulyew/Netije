import oidc from "~/plugins/oidc-plugin";
const oidcManager = oidc;

export default function({ app, $axios, redirect }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  let refreshing = false;
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      // redirect('/400')
    } else if (code == 401) {
      localStorage.setItem("islogin", false);
      let axiosConfig = error.response.config;
      if (!refreshing) {
        refreshing = true;
        return oidcManager.signinSilent().then(user => {
          $axios.setToken(user.access_token, "Bearer");
          localStorage.setItem("role", user.profile.role);
          localStorage.setItem("islogin", true);
          return $axios(axiosConfig);
        });
      }
      return Promise.reject(error);
    }
  });
  oidcManager.getUser().then(user => {
    $axios.setToken(user.access_token, "Bearer");
  });

  $axios.setHeader("Accept-Language", app.i18n.locale);
}
