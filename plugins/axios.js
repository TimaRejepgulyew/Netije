import { alert } from 'devextreme/ui/dialog';

export default function({ store, app: { $axios, i18n } }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  let refreshing = false;
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    if (code === 400) {
      var errors = [];
      for (const key in error.response.data) {
        if (error.response.data.hasOwnProperty(key)) {
          const element = error.response.data[key];
          alert(element + i18n.t("translations.headers.addDocumentRegistry")+"<b>test</b>", "Warning");
          console.log(element);
        }
      }
      console.log(error);
      // redirect('/400')
    }
    // else if (code === 401) {
    //   app.store.dispatch("oidc/authenticateOidcSilent");
    //   window.location.reload;
    // }
  });

  $axios.interceptors.request.use(function (config) {
      config.headers.Authorization ="Bearer " + store.getters["oidc/oidcAccessToken"];
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
 
  $axios.setHeader("Accept-Language", i18n.locale);
}
