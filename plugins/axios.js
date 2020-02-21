
export default function axios ({ $axios, }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  let refreshing = false;
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      // redirect('/400')
    } else if (code === 401) {
      // // localStorage.setItem("islogin", false);
      // // let axiosConfig = error.response.config;
      // // if (!refreshing) {
      // //   refreshing = true;
      // //   return oidc.signinSilent().then(user => {
      // //       console.log("this is 401 error");
      // //       console.log(user);
      // //     $axios.setToken(user.access_token, "Bearer");
      // //     localStorage.setItem("role", user.profile.role);
      // //     localStorage.setItem("islogin", true);
      // //     return $axios(axiosConfig);
      // //   });
      // // }
      // // return Promise.reject(error);
    }
  });

}
