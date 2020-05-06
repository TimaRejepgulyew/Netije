import { alert } from "devextreme/ui/dialog";

export default function ({ store, app: { $axios, i18n } }) {

  $axios.onError(error => {
    if (error.response.headers["content-type"] === "application/problem+json; charset=utf-8") {
      try {
        var responseDetail = JSON.parse(error.response.data.detail);
        var errors = [];
        for (const key in responseDetail) {
          if (responseDetail.hasOwnProperty(key)) {
            responseDetail[key].forEach(element => {
              errors.push(element);
            });
          }
        }

        if (errors) {
          alert(
            `<ul>${errors
              .map(el => {
                return `<li class="text--error">${el}</li>`;
              })
              .join(" ")}</ul>`,
            i18n.t("translations.shared.error")
          );
        }
      }
      catch (e) { 
        alert(error.response.data.detail);
        console.log(error.response.data)
      }
    }
  });

  $axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization =
        "Bearer " + store.getters["oidc/oidcAccessToken"];
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  $axios.setHeader("Accept-Language", i18n.locale);
}
