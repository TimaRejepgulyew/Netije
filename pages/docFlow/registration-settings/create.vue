<template>
  <div>
    <div>
      <Header :headerTitle="this.$t('registrationSettings.caption')" :isNew="true"></Header>
      <toolbar @saveChanges="handleSubmit" :canSave="true" />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="registrationSetting"
        :read-only="false"
        :show-colon-after-label="true"
      >
        <DxGroupItem :col-count="2">
          <DxSimpleItem :col-span="2" :isRequired="true" data-field="name" data-type="string">
            <DxLabel location="top" :text="$t('registrationSettings.fields.name')" />
          </DxSimpleItem>

          <DxSimpleItem
            data-field="settingType"
            :editor-options="settingTypeOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('registrationSettings.fields.settingType')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="status"
            :editor-options="statusOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('shared.status')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="2"
            :isRequired="true"
            data-field="documentFlow"
            :editor-options="documentFlowOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('shared.documentFlow')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :caption="$t('registrationSettings.groups.criterias')">
          <DxSimpleItem
            :isRequired="true"
            :col-span="2"
            :editor-options="documentKindOptions"
            editor-type="dxTagBox"
            data-field="documentKinds"
          >
            <DxLabel location="top" :text="$t('registrationSettings.fields.documentKinds')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="2"
            :editor-options="businessUnitsOptions"
            editor-type="dxTagBox"
            data-field="businessUnits"
          >
            <DxLabel location="top" :text="$t('registrationSettings.fields.businessUnits')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="2"
            :editor-options="departmentsOptions"
            editor-type="dxTagBox"
            data-field="departments"
          >
            <DxLabel location="top" :text="$t('registrationSettings.fields.departments')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :caption="$t('registrationSettings.groups.documentRegister')">
          <DxSimpleItem
           :isRequired="true"
            data-field="documentRegisterId"
            :editor-options="documentRegisterOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('registrationSettings.fields.documentRegister')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxForm>
    </div>
  </div>
</template>
<script>
import SettingTypes from "~/infrastructure/stores/settingTypes.js";
import Toolbar from "~/components/shared/base-toolbar.vue";
import "devextreme-vue/text-area";
import Status from "~/infrastructure/constants/status";
import { DxTagBox } from "devextreme-vue/tag-box";
import Header from "~/components/page/page__header";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    Toolbar
  },
  data() {
    return {
      registrationSetting: {
        status: Status.Active,
        name: null,
        settingType: SettingTypes.Values.Registration,
        documentFlow: null,
        documentRegisterId: null,
        documentKinds: [],
        businessUnits: [],
        departments: []
      },
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.docFlow.RegistrationSetting,
          this.registrationSetting
        ),
        res => {
          this.$router.go(-1);
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
    },
    resetRelatedEntities() {
      this.registrationSetting.documentKinds = [];
      this.registrationSetting.documentRegisterId = null;
    }
  },
  computed: {
    settingTypeOptions() {
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: SettingTypes.GetAll(this),
        onValueChanged: e => {
          this.resetRelatedEntities();
        }
      };
    },
    statusOptions() {
      return {
        valueExpr: "id",
        displayExpr: "status",
        dataSource: this.$store.getters["status/status"](this)
      };
    },
    documentFlowOptions() {
      return {
        dataSource: this.$store.getters["docflow/docflow"](this),
        valueExpr: "id",
        displayExpr: "name",
        onValueChanged: e => {
          this.resetRelatedEntities();
        }
      };
    },
    documentKindOptions() {
      var numberingType = SettingTypes.mapToNumberingType(
        this.registrationSetting.settingType
      );
      return {
        readOnly: this.registrationSetting.documentFlow == null,
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: [
            ["status", "=", Status.Active],
            "and",
            ["documentFlow", "=", this.registrationSetting.documentFlow],
            ["numberingType", "=", numberingType]
          ]
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    businessUnitsOptions() {
      return {
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.BusinessUnit
          }),
          filter: ["status", "=", Status.Active]
        },
        valueExpr: "id",
        displayExpr: "name",
        onValueChanged: e => {
          this.registrationSetting.departments = [];
        }
      };
    },
    departmentsOptions() {
      let departmentByBusinessUnitFilter = [];
      this.registrationSetting.businessUnits.map(item => {
        departmentByBusinessUnitFilter.push(["businessUnitId", "=", item]);
        departmentByBusinessUnitFilter.push("or");
      });
      let filter = [["status", "=", Status.Active], "and"];
      filter.push(departmentByBusinessUnitFilter);
      return {
        readOnly: this.registrationSetting.businessUnits.length == 0,
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: filter
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    documentRegisterOptions() {
      var registerType = SettingTypes.mapToRegisterType(
        this.registrationSetting.settingType
      );
      return {
        readOnly: this.registrationSetting.documentFlow == null,
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentRegister.AvailableForRegistrationSetttings
          }),
          filter: [
            ["status", "=", Status.Active],
            "and",
            ["documentFlow", "=", this.registrationSetting.documentFlow],
            "and",
            ["registerType", "=", registerType]
          ]
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    }
  }
};
</script>
<style>
</style>

