<template>
  <h1>callback</h1>
</template>
<script>
import Oidc, { WebStorageStateStore } from "oidc-client";
import { mapActions } from "vuex";
export default {
  //   mounted() {

  //     new Oidc.UserManager({
  //       response_mode: "query",
  //       userStore: new WebStorageStateStore({ store: window.localStorage })
  //     })

  //       .signinRedirectCallback()
  //       .then(() => {
  //         this.$router.push("/home");
  //       })
  //       .catch(function(e) {});
  //   }
  created() {
    if (process.client) {
      this.oidcSignInCallback()
        .then(redirectPath => {
          this.router.push(redirectPath);
        })
        .catch(err => {
  
          this.$router.push("/signin-oidc-error");
        });
    }
  },
  methods: {
    ...mapActions("oidc", ["oidcSignInCallback"])
  }
};
</script>