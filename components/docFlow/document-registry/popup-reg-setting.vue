<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="registrationSetting"
    >
      <DxSimpleItem data-field="name" data-type="string">
        <DxLabel :text="$t('translations.fields.name')" />
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options=" businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.businessUnitId')" />
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        :editor-options="departmentOptions"
        editor-type="dxTagBox"
        data-field="departments"
      >
        <DxLabel :text="$t('translations.fields.departmentId')" />
        <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        :editor-options="regGroupOptions"
        editor-type="dxTagBox"
        data-field="registrationGroups"
      >
        <DxLabel :text="$t('translations.fields.registrationGroupId')" />
        <DxRequiredRule :message="$t('translations.fields.registrationGroupIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        :editor-options="documentKindsOptions"
        editor-type="dxTagBox"
        data-field="documentKinds"
      >
        <DxLabel :text="$t('translations.fields.documentKindId')" />
        <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="status"
        :visible="isUpdated"
        :editor-options="statusOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.status')" />
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
import DataSource from "devextreme/data/data_source";
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
    if (this.id) {
      let res = await this.getDataById(`${this.address}/${this.id}`);
      this.isUpdated = true;
      res.status = 0;
      this.store = res;
    }
  },
  computed: {
    address() {
      return `${dataApi.docFlow.RegistrationSetting}`;
    },
    businessUnitOptions() {
      let dataSource;
      if (this.isUpdated) {
        dataSource = this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit
        });
      } else {
        dataSource = this.$dxStore({
          key: "id",
          loadUrl:
            dataApi.docFlow.RegSettingAvailableBusinessUnits +
            "/" +
            this.documentRegisterId
        });
      }
      return {
        dataSource: dataSource,
        disabled: this.isUpdated,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    departmentOptions() {
      if (!this.isUpdated) {
        this.store.departments = null;
      }
      let id = this.store.businessUnitId;
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: [["businessUnitId", "=", id], "and", ["status", "=", 0]]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    documentKindsOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },

    regGroupOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.RegistrationGroup
          })
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    statusOptions() {
      return {
        dataSource: this.$store.getters["status/status"],
        valueExpr: "id",
        displayExpr: "status"
      };
    }
  },
  props: ["documentRegisterId", "id"],
  data() {
    return {
      store: {
        documentRegisterId: this.documentRegisterId,
        name: null,
        businessUnitId: null,
        departments: null,
        documentKinds: null,
        registrationGroups: null
      },
      isUpdated: false,
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
      if (this.isUpdated) {
        delete this.store.businessUnitId;
        this.$axios
          .put(`${this.address}/${this.id}`, this.store)
          .then(res => {
            this.$emit("popupDisabled");
            this.notify(
              this.$t("translations.headers.updateDocRegistrySucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.updateDocRegistrySucces"),
              "error"
            );
          });
      } else {
        this.$axios
          .post(this.address, this.store)
          .then(res => {
            this.$emit("popupDisabled");
            this.notify(
              this.$t("translations.headers.addDoctRegistrySucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.addDoctRegistryError"),
              "error"
            );
          });
      }

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>