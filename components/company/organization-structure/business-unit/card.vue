<template>
  <div v-if="data">
    <Header :showTitle="!isCard" :headerTitle="data.name" :isbackButton="false"></Header>
    <DxForm :read-only="readOnly" :form-data="data" id="form" :col-count="2">
      <DxSimpleItem data-field="name" data-type="string">
        <DxLabel :text="$t('shared.name')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="headCompanyId"
        :editor-options="headCompanyOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('companyStructure.fields.headCompany')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="code">
        <DxLabel :text="$t('shared.code')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="tin">
        <DxLabel :text="$t('translations.fields.tin')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="regionId"
        :editor-options="regionIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.regionId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="localityId"
        :editor-options="localityIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.localityId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="phones">
        <DxLabel :text="$t('translations.fields.phones')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="legalName">
        <DxLabel :text="$t('translations.fields.legalName')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="legalAddress">
        <DxLabel :text="$t('translations.fields.legalAddress')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="postalAddress">
        <DxLabel :text="$t('translations.fields.postAddress')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="ceo"
        :editor-options="ceoOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.ceo')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="email">
        <DxLabel :text="$t('translations.fields.email')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="homepage">
        <DxLabel :text="$t('translations.fields.webSite')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="account">
        <DxLabel :text="$t('translations.fields.account')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="bankId"
        :editor-options="bankIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.bankId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="status"
        :editor-options="statusOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.status')" />
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
      readOnly: true,
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    Header,
  },
  computed: {
    headCompanyOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    regionIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Region,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    localityIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Locality,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    ceoOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
    bankIdOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.Bank,
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