<template>
  <div v-if="data">
    <Header :showTitle="!isCard" :headerTitle="data.name" :isbackButton="false"></Header>
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
      <DxSimpleItem 
        data-field="note"
        :editor-options="noteOptions"
        editor-type="dxTextArea"
      >
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
    </DxForm>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxLabel } from "devextreme-vue/form";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import "devextreme/ui/text_area";
export default {
  props: ["data","isCard"],
  data() {
    return {
      statusDataSource: this.$store.getters["status/status"](this),
      readOnly:true,
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
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
    noteOptions() {
      return {
        height:90
      };
    },
  },
};
</script>