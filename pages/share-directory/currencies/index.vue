<template>
  <main class="container container--grid">
    <h1>{{ $t("translations.menu.currencies") }}</h1>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        file-name="Currency"
      />
      <DxSelection mode="multiple" />
      
      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="currency"
      />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        mode="form"
        :useIcons="true"
      />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.currencyId')"
        alignment="left"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule
          :max="60"
          message="The name must not exceed 60 symbols"
        />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateCurrencyName"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="alphaCode"
        :caption="$t('translations.fields.alphaCode')"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule
          :max="3"
          message="The name must not exceed 3 symbols"
        />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="shortName"
        :caption="$t('translations.fields.shortName')"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule
          :max="60"
          message="The Short name must not exceed 60 symbols"
        />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="fractionName"
        :caption="$t('translations.fields.fractionName')"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule
          :max="20"
          message="The Fraction name must not exceed 20 symbols"
        />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="isDefault"
        data-type="boolean"
        :caption="$t('translations.fields.isDefault')"
      ></DxColumn>
      <DxColumn
        data-field="numericCode"
        :caption="$t('translations.fields.numericCode')"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule
          :max="3"
          message="The name must not exceed 3 symbols"
        />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
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
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
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
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
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
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Currency,
        insertUrl: dataApi.sharedDirectory.Currency,
        updateUrl: dataApi.sharedDirectory.Currency,
        removeUrl: dataApi.sharedDirectory.Currency
      }),
      statusStores: this.$store.getters["general-handbook/Status"],

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
@import "~assets/themes/generated/variables.base.scss";

.container {
  display: block;
}
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>
