<template>
  <main>
    <Header :headerTitle="$t('menu.currencies')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="false"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('sharedDirectory.fields.currencyId')"
      />

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
        :caption="$t('sharedDirectory.fields.currencyId')"
        alignment="left"
        data-type="string"
      >
        <DxRequiredRule :message="$t('sharedDirectory.validation.currencyIdRequired')" />
        <DxStringLengthRule :max="60" :message="$t('shared.nameShouldNotBeMoreThan')" />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('sharedDirectory.validation.currencyAlreadyExists')"
          :validation-callback="validateCurrencyName"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="alphaCode" :caption="$t('sharedDirectory.fields.alphaCode')">
        <DxRequiredRule :message="$t('sharedDirectory.validation.alphaCodeRequired')" />
        <DxStringLengthRule :max="3" :message="$t('translations.fields.maxLength')+' 3'" />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('sharedDirectory.validation.alphaCodeAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="shortName" :caption="$t('shared.shortName')">
        <DxRequiredRule :message="$t('shared.shortNameRequired')" />
        <DxStringLengthRule :max="60" :message="$t('translations.fields.maxLength')+' 60'" />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('parties.validation.countryAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="fractionName" :caption="$t('sharedDirectory.fields.fractionName')">
        <DxRequiredRule :message="$t('sharedDirectory.validation.fractionNameRequired')" />
        <DxStringLengthRule :max="20" :message="$t('translations.fields.maxLength')+' 20'" />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('sharedDirectory.validation.fractionNameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="isDefault"
        data-type="boolean"
        :caption="$t('docFlow.fields.isDefault')"
      ></DxColumn>
      <DxColumn data-field="numericCode" :caption="$t('sharedDirectory.fields.numericCode')">
        <DxRequiredRule :message="$t('sharedDirectory.validation.numericCodeRequired')" />
        <DxStringLengthRule :max="3" :message="$t('translations.fields.maxLength')+' 3'" />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('sharedDirectory.fields.numericCodeAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
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
  DxColumnChooser,
  DxColumnFixing,
  DxStateStoring,
  DxFilterRow,
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
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxFilterRow,
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Currency,
        insertUrl: dataApi.sharedDirectory.Currency,
        updateUrl: dataApi.sharedDirectory.Currency,
        removeUrl: dataApi.sharedDirectory.Currency,
      }),
      entityType: EntityType.Currencies,
      statusDataSource: this.$store.getters["status/status"](this),
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    validateCurrencyName(params) {
      return this.$customValidator.isCurrencyNameNotExists({
        id: params.data.id,
        name: params.value,
      });
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CurrencyDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value,
        },
        dataField
      );
    },
  },
};
</script>
