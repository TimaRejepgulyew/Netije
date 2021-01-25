<template>
  <div v-if="data">
    <Header
      :showTitle="!isCard"
      :headerTitle="data.name"
      :isbackButton="false"
    ></Header>
    <DxForm :read-only="readOnly" :form-data="data" id="form" :col-count="2">
      <DxSimpleItem data-field="name" data-type="string">
        <DxLabel :text="$t('shared.name')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="phone">
        <DxLabel :text="$t('translations.fields.phones')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="code">
        <DxLabel :text="$t('shared.code')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="shortName">
        <DxLabel :text="$t('shared.shortName')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="headOffice" template="headOfficeSelectBox">
        <DxLabel :text="$t('translations.fields.headOfficeId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="manager" template="managerSelectBox">
        <DxLabel :text="$t('translations.fields.managerId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="businessUnit" template="businessUnitSelectBox">
        <DxLabel :text="$t('translations.fields.businessUnitId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="status"
        :editor-options="statusOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.status')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="note">
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="note"
        :editor-options="noteOptions"
        editor-type="dxTextArea"
      >
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <template #businessUnitSelectBox>
        <business-unit-select-box
          :value="data.businessUnit"
          :read-only="readOnly"
        />
      </template>
      <template #managerSelectBox>
        <employee-select-box :value="data.manager" :readOnly="readOnly" />
      </template>
      <template #headOfficeSelectBox>
        <department-select-box :value="data.headOffice" :read-only="readOnly" />
      </template>
    </DxForm>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxLabel } from "devextreme-vue/form";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import "devextreme/ui/text_area";
export default {
  props: ["data", "isCard"],
  data() {
    return {
      statusDataSource: this.$store.getters["status/status"](this),
      readOnly: true,
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    Header,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
    EmployeeSelectBox,
  },
  computed: {
    headOfficeIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Department,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    managerIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    businessUnitIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    statusOptions() {
      return {
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
      };
    },
    noteOptions() {
      return {
        height: 90,
      };
    },
  },
};
</script>