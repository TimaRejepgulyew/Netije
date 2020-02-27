<template></template>
<script>
import Oidc, { WebStorageStateStore } from "oidc-client";
import { mapActions } from "vuex";
export default {
  created() {
    if (process.client) {
      this.oidcSignInCallback()
        .then(redirectPath => {
        
          window.location.href = redirectPath;
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