<template>
  <main >
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.currencyId')"
      />
      <DxSelection mode="multiple" />

      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="currency" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        mode="form"
        :useIcons="true"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.currencyId')"
        alignment="left"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.currencyIdRequired')" />
        <DxStringLengthRule :max="60" :message="$t('translations.fields.nameShouldNotBeMoreThan')" />
        <DxAsyncRule
          :message="$t('translations.fields.currencyAlreadyExists')"
          :validation-callback="validateCurrencyName"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="alphaCode" :caption="$t('translations.fields.alphaCode')">
        <DxRequiredRule :message="$t('translations.fields.alphaCodeRequired')" />
        <DxStringLengthRule :max="3" :message="$t('translations.fields.maxLength')+' 3'" />
        <DxAsyncRule
          :message="$t('translations.fields.alphaCodeAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="shortName" :caption="$t('translations.fields.shortName')">
        <DxRequiredRule :message="$t('translations.fields.shortNameRequired')" />
        <DxStringLengthRule :max="60" :message="$t('translations.fields.maxLength')+' 60'" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="fractionName" :caption="$t('translations.fields.fractionName')">
        <DxRequiredRule :message="$t('translations.fields.fractionNameRequired')" />
        <DxStringLengthRule :max="20" :message="$t('translations.fields.maxLength')+' 20'" />
        <DxAsyncRule
          :message="$t('translations.fields.fractionNameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="isDefault"
        data-type="boolean"
        :caption="$t('translations.fields.isDefault')"
      ></DxColumn>
      <DxColumn data-field="numericCode" :caption="$t('translations.fields.numericCode')">
        <DxRequiredRule :message="$t('translations.fields.numericCodeRequired')" />
        <DxStringLengthRule :max="3" :message="$t('translations.fields.maxLength')+' 3'" />
        <DxAsyncRule
          :message="$t('translations.fields.numericCodeAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusStores"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxRequiredRule,
  DxAsyncRule,
  DxStringLengthRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxStateStoring,
  DxFilterRow
} from "devextreme-vue/data-grid";

export default {
  components: {
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxRequiredRule,
    DxAsyncRule,
    DxStringLengthRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxFilterRow
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.currencies"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Currency,
        insertUrl: dataApi.sharedDirectory.Currency,
        updateUrl: dataApi.sharedDirectory.Currency,
        removeUrl: dataApi.sharedDirectory.Currency
      }),
      entityType: "Currencies",
      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    validateCurrencyName(params) {
      return this.$customValidator.isCurrencyNameNotExists({
        id: params.data.id,
        name: params.value
      });
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CurrencyDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    }
  }
};
</script>
<style lang="scss" scoped>

