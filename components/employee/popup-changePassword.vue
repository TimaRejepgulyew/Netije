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
        <DxLabel :text="$t('translations.fields.password')" />
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
  DxRangeRule,
  DxStringLengthRule,
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
    DxRangeRule,
    DxStringLengthRule,
    DxForm,
    DxAsyncRule
  },

  data() {
    return {
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
      passwordPattern: /(?=.*[0-9])(?=.*[!.-_@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!.-_@#$%^&*a-zA-Z]{6,}/g
    };
  },
  methods: {
    handleSubmit(e) {
      this.$axios
        .post(dataApi.company.Employee + "/ChangePassword", this.store)
        .then(res => {
          this.$emit("popupDisabled");
          notify(
            {
              message: this.$t("translations.menu.addEmployeeSucces"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "success",
            3000
          );
        })
        .catch(e => {
          notify(
            {
              message: this.$t("translations.menu.addEmployeeError"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "error",
            3000
          );
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>

