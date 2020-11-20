import { alert } from "devextreme/ui/dialog";

export default function ({ store, app: { router, $axios, i18n } }) {
  if (process.env.NODE_ENV === "production") {
    $axios.setBaseURL(document.location.origin);
  } else {
    $axios.setBaseURL(process.env.serverUrl);
  }
  $axios.onError(error => {
    try {
      if (error.response.status === 404) {
        router.push("/error/404");
      } else if (
        error.response.headers["content-type"] ===
        "application/problem+json; charset=utf-8"
      ) {
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
            i18n.t("shared.error")
          );
        }
      } else {
        console.log(error);
      }
    } catch (e) {
      console.log(error);
      console.log(e);
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
