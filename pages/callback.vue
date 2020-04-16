<template>
  <div></div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  layout: "entity",
  created() {
    if (process.client) {
      this.oidcSignInCallback()
        .then(redirectPath => {
          console.log("log in");
          this.$store.dispatch(
            "permissions/getPermissions",
            this.$store.getters["oidc/oidcUser"].Metadata
          );
          this.$router.push(redirectPath);
        })
        .catch(err => {
          console.log("error", err);
          this.$router.push("/callback");
        });
    }
  },
  methods: {
    ...mapActions("oidc", ["oidcSignInCallback"])
  }
};
</script>