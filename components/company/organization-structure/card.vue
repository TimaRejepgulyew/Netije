<template>
  <div v-if="data">
    <Header :headerTitle="data.name" :isbackButton="false"></Header>
    <DxForm :read-only="true" :form-data="data" id="form" :col-count="2">
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
      <DxSimpleItem data-field="regionId">
        <DxLabel :text="$t('translations.fields.regionId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="localityId">
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
      <DxSimpleItem data-field="ceo">
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
      <DxSimpleItem data-field="bankId">
        <DxLabel :text="$t('translations.fields.bankId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="status">
        <DxLabel :text="$t('translations.fields.status')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="note" template="textAreaEditor">
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="(value) => onValueChanged(value, cellInfo.data)"
        ></textArea>
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
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    textArea,
    Header,
  },
  computed: {
    headCompanyOptions() {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit,
        }),
        valueExpr: "id",
        displayExpr: "name",
      };
    },
  },
};
</script>