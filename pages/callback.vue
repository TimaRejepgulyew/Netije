<template>
  <h1>callback</h1>
</template>
<script>
import Oidc, { WebStorageStateStore } from "oidc-client";

export default {
  mounted() {

    new Oidc.UserManager({
      response_mode: "query",
      userStore: new WebStorageStateStore({ store: window.localStorage })
    })

      .signinRedirectCallback()
      .then(() => {
        this.$router.push("/home");
      })
      .catch(function(e) {});
  }
};
</script>