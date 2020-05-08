<template></template>
<script>
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";

export default {
  mounted: function() {
    this.$nextTick(function() {
      let result = confirm(this.$t("translations.fields.areYouSure"));
      result.then(dialogResult => {
        if (dialogResult) {
          this.$awn.asyncBlock(
            this.$axios.post(dataApi.documentRegistration.UnregisterDocument, {
              documentId: +this.$route.params.id
            }),
            res => {
              this.$store.commit("paper-work/SET_IS_REGISTERED", {
                documentId: +this.$route.params.id,
                state: 1
              });
              this.$emit("setPermissions", false);
              this.$emit("popupDisabled");
              this.$awn.success();
            },
            err => this.$awn.alert()
          );
        }
      });
    });
  }
};
</script>