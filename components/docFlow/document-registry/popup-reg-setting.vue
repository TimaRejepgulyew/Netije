<template>
  <form  @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="registrationSetting"
    >
      <DxSimpleItem data-field="name" data-type="string">
        <DxLabel location="top" :text="$t('translations.fields.name')" />
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options=" businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.businessUnitId')" />
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        :editor-options="departmentOptions"
        editor-type="dxTagBox"
        data-field="departments"
      >
        <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
      </DxSimpleItem>

      <DxSimpleItem
        :editor-options="documentKindsOptions"
        editor-type="dxTagBox"
        data-field="documentKinds"
      >
        <DxLabel location="top" :text="$t('translations.fields.documentKindId')" />
        <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="left" />
    </DxForm>
  </form>
</template>
<script>
import Status from "~/infrastructure/constants/status";
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
  props: ["documentRegisterId", "id"],
  async created() {
    if (this.id) {
      let res =  await this.$axios.get(`${dataApi.docFlow.RegistrationSetting}/${this.id}`)
      this.isUpdated = true;
      res.status = 0;
      this.store = res.data;
    }
  },
  computed: {
    address() {
      return `${dataApi.docFlow.RegistrationSetting}`;
    },
    businessUnitOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.BusinessUnit,
      });
    },
    departmentOptions() {
      if (!this.isUpdated) {
        this.store.departments = null;
      }
      let id = this.store.businessUnitId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
        filter: [["businessUnitId", "=", id], "and", ["status", "=", Status.Active]]
      });
    },

    documentKindsOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: `${dataApi.docFlow.RegSettingAvailableDocumentKinds}/${this.documentRegisterId}`
      });
    },

    statusOptions() {
      return {
        dataSource: this.$store.getters["status/status"],
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true
      };
    }
  },

  data() {
    return {
      store: {
        documentRegisterId: this.documentRegisterId,
        name: null,
        businessUnitId: null,
        departments: null,
        documentKinds: null
      },
      isUpdated: false,
      saveButtonOptions: {
        height: 40,
        text: this.$t("buttons.save"),
        useSubmitBehavior: true,
        type: "normal"
      }
    };
  },
  methods: {
    handleSubmit(e) {
      let promise;
      if (this.isUpdated) {
        promise = this.$axios.put(`${dataApi.docFlow.RegistrationSetting}/${this.id}`,this.store)
      } else {
        promise = this.$axios.post(`${dataApi.docFlow.RegistrationSetting}`, this.store);
      }
      this.$awn.asyncBlock(promise,
        res => {
          delete this.store.businessUnitId;
          this.$emit("hidePopup");
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
      e.preventDefault();
    }
  }
};
</script>