<template>
  <div v-if="data">
    <Header :headerTitle="data.name" :isbackButton="false"></Header>
    <DxForm :read-only="true" :form-data="data" id="form" :col-count="2">
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
      <DxSimpleItem
        data-field="headOfficeId"
        :editor-options="headOfficeIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.headOfficeId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="managerId"
        :editor-options="managerIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.managerId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitIdOptions"
        editor-type="dxSelectBox"
      >
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
      <DxSimpleItem data-field="note" template="textAreaEditor">
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <template #textAreaEditor>
        <textArea
          :value="data.note"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxLabel } from "devextreme-vue/form";
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
export default {
  props: ["data"],
  data() {
    return {
      statusDataSource: this.$store.getters["status/status"](this),
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    textArea,
    Header,
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
  },
};
</script>