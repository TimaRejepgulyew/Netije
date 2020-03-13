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
  async created() {
    this.store.roles = await this.getDataById(this.addressGetRequest);
  },
  data() {
    return {
      addressGetRequest:
        dataApi.company.Employee + "/GetAllUserRoles/" + this.$route.params.id,
      addressPostRequest: dataApi.company.Employee + "/ChangeUserRoles",
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
    async getDataById(url) {
      const res = await this.$axios.get(url);
      return res.data;
    },
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
        .post(this.addressPostRequest, this.store)
        .then(res => {
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.headers.updateDocRegistrySucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(this.$t("translations.fields.addNewRolesError"), "error");
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>

