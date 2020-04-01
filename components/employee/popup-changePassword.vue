<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="changePassword"
    >
      <DxSimpleItem :editor-options="passwordOptions" data-field="newPassword">
        <DxLabel location="top" :text="$t('translations.fields.password')" />
        <DxPatternRule
          :pattern="passwordPattern"
          :message="$t('translations.fields.passwordRule')"
        />
        <DxRequiredRule :message="$t('translations.fields.passwordRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>
<script>
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxForm,
    DxAsyncRule
  },

  data() {
    return {
      address: dataApi.company.Employee + "/ChangePassword",
      store: {
        id: parseInt(this.$route.params.id),
        newPassword: ""
      },

      saveButtonOptions: {
        height: 50,
        text: this.$t("translations.links.save"),
        useSubmitBehavior: true,
        type: "success"
      },
      passwordOptions: {
        mode: "password"
      },
      passwordPattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$"
    };
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
        .post(this.address, this.store)
        .then(res => {
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.menu.addEmployeeSucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(this.$t("translations.menu.addEmployeeError"), "error");
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>

