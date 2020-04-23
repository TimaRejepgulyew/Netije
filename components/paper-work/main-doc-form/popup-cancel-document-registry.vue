<template>
  <form @submit="handleSubmit">
    <p class="text--warning">{{$t('translations.fields.areYouSure')}}</p>
    <div class="button-group mr-top-auto">
      <DxButton type="success" :useSubmitBehavior="true" :text="$t('translations.links.yes')"></DxButton>
      <DxButton
        :text="$t('translations.links.no')"
        :onClick="()=>{
                  $emit('popupDisabled')}"
      ></DxButton>
    </div>
  </form>
</template>

<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
export default {
  components: {
    DxButton
  },
  methods: {
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit(e) {
      this.$axios
        .post(dataApi.paperWork.UnregisterDocument, {
          documentId: +this.$route.params.id
        })
        .then(res => {
          this.$store.commit("paper-work/SET_REG_PROPERTIES", {
            documentRegisterId: '',
            registrationDate: "",
            registrationNumber: ""
          });
          this.$store.commit("paper-work/SET_IS_REGISTERED", {
            documentId: +this.$route.params.id,
            state: 1
          });
          this.$emit("setPermissions", false);
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.fields.cancelDocRegistrySuccess"),
            "success"
          );
        })
        .catch(e => {
          this.notify(
            this.$t("translations.fields.cancelDocRegistryError"),
            "error"
          );
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
.text--warning {
  color: crimson;
}
</style>