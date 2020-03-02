<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="changeRole"
    >
      <DxSimpleItem :editor-options="tagboxOptions" editor-type="dxTagBox" data-field="roles">
        <DxLabel :text="$t('translations.fields.role')" />
        <DxRequiredRule :message="$t('translations.fields.roleRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>
<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import { DxTagBox } from "devextreme-vue/tag-box";
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
    DxAsyncRule,
    DxTagBox,
    DxButton
  },
  async mounted() {
    var res = await this.$axios.get(
      dataApi.company.Employee + "/GetAllUserRoles/" + this.$route.params.id
    );
    this.store.roles = res.data;
  },
  data() {
    return {
      store: {
        employeeId: parseInt(this.$route.params.id),
        roles: []
      },

      tagboxOptions: {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Department
        }),
        items: this.roles,
        acceptCustomValue: true,
        onCustomItemCreating: this.addNewRole
      },
      addNewRole: args => {
        const newValue = args.text;
        args.customItem = newValue;
        this.roles.unshift(newValue);
      },
      saveButtonOptions: {
        height: 50,
        text: this.$t("translations.links.save"),
        useSubmitBehavior: true,
        type: "success"
      }
    };
  },
  methods: {
    handleSubmit(e) {
      this.$axios
        .post(dataApi.company.Employee + "/ChangeUserRoles", this.store)
        .then(res => {
          this.$emit("popupDisabled");
          notify(
            {
              message: this.$t("translations.fields.addNewRoles"),
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
              message: this.$t("translations.fields.addNewRolesError"),
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

