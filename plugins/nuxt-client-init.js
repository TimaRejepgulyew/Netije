import dataApi from "~/static/dataApi";
import { vuexOidcCreateStoreModule } from "vuex-oidc";
import { WebStorageStateStore } from "oidc-client";

export default async function({ store }) {
  const res = await fetch(dataApi.OidcConfiguration);
  const config = await res.json();
  const storeModule = vuexOidcCreateStoreModule(
    {
      automaticSilentRenew: true,
      silentRequestTimeout: 100,
      ...config,
      userStore: new WebStorageStateStore({ store: window.localStorage })
    },

    {
      namespaced: true,
      dispatchEventsOnWindow: true,
      publicRoutePaths: ["/callback"]
    },
    {
      // userLoaded: (user) => {
      //   console.log("OIDC user is loaded:", user);
      // },
      // user1Unloaded: () => console.log("OIDC user is unloaded"),
      // accessTokenExpiring: () => console.log("Access token will expire"),
      // accessTokenExpired: () => console.log("Access token did expire"),
      // silentRenewError: () => console.log("OIDC user is unloaded"),
      // userSignedOut: () => console.log("OIDC user is signed out"),
    }
  );
  store.registerModule("oidc", storeModule);
}
