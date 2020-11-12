<template>
  <div>
    <div>
      <Header :headerTitle="$t('docFlow.personalSetting.mySetting')"></Header>
      <toolbar
        @saveChanges="handleSubmit"
        :canSave="$store.getters['permissions/allowUpdating'](this.entityType)"
      />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="personalSettings"
        :read-only="!$store.getters['permissions/allowUpdating'](entityType)"
        :show-colon-after-label="true"
        validation-group="personalSettings"
      >
        <DxGroupItem :col-count="1">
          <DxSimpleItem
            data-field="businessUnitId"
            template="businessUnitSelectBox"
          >
            <DxLabel location="top" :text="$t('document.fields.businessUnitId')" />
            <DxRequiredRule
              :message="$t('document.validation.businessUnitIdRequired')"
            />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="departmentId"
            template="departmentSelectBox"
            >
              <DxLabel location="top" :text="$t('document.fields.departmentId')" />
              <DxRequiredRule
                :message="$t('document.validation.departmentIdRequired')"
              />
            </DxSimpleItem>
        </DxGroupItem>
        <template #businessUnitSelectBox>
          <business-unit-select-box
            valueExpr="id"
            :value="businessUnitId"
            validatorGroup="personalSettings"
            @valueChanged=" (data) => {
                            setBusinessUnitId(data)
                            setDepartmentId(null)
                        } "
          />
        </template>
        <template #departmentSelectBox>
          <department-select-box
            valueExpr="id"
            :value="departmentId"
            validatorGroup="personalSettings"
            :businessUnitId="businessUnitId"
            @valueChanged="(data) => {
                            setDepartmentId(data)
                        } "
          />
        </template>
      </DxForm>
    </div>
  </div>
</template>
<script>
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import Toolbar from "~/components/shared/base-toolbar.vue";
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
import { DxTagBox } from "devextreme-vue/tag-box";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";

import dataApi from "~/static/dataApi";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
    Toolbar,
    BusinessUnitSelectBox,
    DepartmentSelectBox
  },
  async asyncData({ app, params }) {
    var res = await app.$axios.get(dataApi.docFlow.PersonalSettings);
    return {
      personalSettings: res.data,
    };
  },
  data() {
    return {
      entityType: EntityType.PersonalSettings,
    };
  },
  computed: {
    businessUnitId() {
      return this.personalSettings.businessUnitId;
    },
    departmentId() {
      return this.personalSettings.departmentId;
    },
  },
  methods: {
    setDepartmentId(data){
      this.personalSettings.departmentId = data
    },
    setBusinessUnitId(data){
      this.personalSettings.businessUnitId = data
    },
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      const object = { ...this.personalSettings };
      this.$awn.asyncBlock(
        this.$axios.put(`${dataApi.docFlow.PersonalSettings}`, object),
        (res) => this.$awn.success(),
        (err) => this.$awn.alert()
      );
    },
  },
};
</script>
