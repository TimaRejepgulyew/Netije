<template>
  <div>
    <form @submit="handleSubmit">
      <DxForm
        :form-data="formData"
        :read-only="false"
        :show-colon-after-label="true"
        :show-validation-summary="true"
        validation-group="changePassword"
      >
        <DxSimpleItem :editor-options="passwordOptions" data-field="newPassword">
          <DxLabel location="top" :text="$t('translations.fields.password')" />

          <DxRequiredRule :message="$t('translations.fields.passwordRequired')" />
        </DxSimpleItem>
        <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
      </DxForm>
    </form>
  </div>
</template>
<script>
import dataApi from "~/static/dataApi";
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
      formData: {
        id: parseInt(this.$route.params.id),
        newPassword: ""
      },
      saveButtonOptions: {
        height: 40,
        text: this.$t("buttons.changePassword"),
        useSubmitBehavior: true,
        type: "normal"
      },
      passwordOptions: {
        mode: "password"
      }
    };
  },
  methods: {
    handleSubmit(e) {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.company.ChangeEmployeePassword, this.formData),
        e => {
          this.formData.newPassword = "";
          this.$emit("hidePopup");
          this.$awn.success();
        },
        e => {
          this.formData.newPassword = "";
          this.$awn.alert();
        }
      );
      e.preventDefault();
    }
  }
};
</script>

