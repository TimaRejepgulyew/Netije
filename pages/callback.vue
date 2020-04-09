<template>
  <div></div>
</template>
<script>
import Oidc, { WebStorageStateStore } from "oidc-client";
import { mapActions } from "vuex";
export default {
  layout: "entity",
  created() {
    if (process.client) {
      this.oidcSignInCallback()
        .then(redirectPath => {
          this.$store.dispatch(
            "permissions/getPermissions",
            this.$store.getters["oidc/oidcUser"].Metadata
          );

          this.$router.push(redirectPath);
        })
        .catch(err => {
          this.$router.push("/callback");
        });
    }
  },
  methods: {
    ...mapActions("oidc", ["oidcSignInCallback"])
  }
};
</script>