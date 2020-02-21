
export default function ({ app, $axios }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  let refreshing = false;
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      // redirect('/400')
    } else if (code === 401) {
      let axiosConfig = error.response.config;
      console.log(axiosConfig, 'axios');
      console.log(app.store);
      if (!refreshing) {
        refreshing = true;
        app.store.dispatch('oidc/oidcSignInCallback');
        return $axios(axiosConfig);
        // return oidc.signinSilent().then(user => {
        //     console.log("this is 401 error");
        //     console.log(user);
        //   $axios.setToken(user.access_token, "Bearer");

        //   return $axios(axiosConfig);
        // });
      }
      return Promise.reject(error);
    }
  });

}
