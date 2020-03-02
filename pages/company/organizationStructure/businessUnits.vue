<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
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
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.businessUnit')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="BusinessUnit" />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.businessUnitAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="description"
        :caption="$t('translations.fields.description')"
        data-type="string"
      />

      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')" :visible="false">
        <DxRequiredRule :message="$t('translations.fields.tinRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.tinAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="localityId" :caption="$t('translations.fields.localityId')">
        <DxRequiredRule :message="$t('translations.fields.localityIdRequired')" />
        <DxLookup :data-source="getFilteredLocality" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')" :visible="false" />

      <DxColumn
        data-field="legalName"
        :caption="$t('translations.fields.legalName')"
        :visible="false"
      >
        <DxRequiredRule :message="$t('translations.fields.legalNameRequired')" />
      </DxColumn>

      <DxColumn
        data-field="regionId"
        :caption="$t('translations.fields.regionId')"
        :set-cell-value="onRegionIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup :data-source="getFilteredRegion" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        data-field="headCompanyId"
        :caption="$t('translations.fields.headCompanyId')"
        :visible="false"
      >
        <DxLookup :data-source="store" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      />

      <DxColumn
        data-field="postalAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      />

      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false" />

      <DxColumn data-field="ceo" :caption="$t('translations.fields.ceo')" :visible="true">
        <DxLookup :data-source="getFilteredEmployee" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')" :visible="false" />

      <DxColumn
        data-field="homepage"
        :caption="$t('translations.fields.homepage')"
        :visible="false"
      />

      <DxColumn data-field="account" :caption="$t('translations.fields.account')"></DxColumn>

      <DxColumn data-field="bankId" :caption="$t('translations.fields.bankId')">
        <DxRequiredRule :message="$t('translations.fields.bankIdRequired')" />
        <DxLookup :data-source="getFilteredBank" value-expr="id" display-expr="name" />
      </DxColumn>
      <DxColumn data-field="code" :caption="$t('translations.fields.code')"></DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import Header from "~/components/page/page__header";
import dataApi from "~/static/dataApi";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
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
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.businessUnit"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit,
        insertUrl: dataApi.company.BusinessUnit,
        updateUrl: dataApi.company.BusinessUnit,
        removeUrl: dataApi.company.BusinessUnit
      }),

      statusStores: this.$store.getters["status/status"],

      region: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region
      }),

      locality: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Locality
      }),

      bank: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Bank
      }),
      employee: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },

      onRegionIdChanged(rowData, value) {
        rowData.localityId = null;
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    getFilteredRegion(options) {
      return {
        store: this.region,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.regionId]
          : null
      };
    },
    getFilteredLocality(options) {
      return {
        store: this.locality,
        filter: options.data
          ? ["regionId", "=", options.data.regionId, "or", "status", "=", 0]
          : null
      };
    },
    getFilteredBank(options) {
      return {
        store: this.bank,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.bankId]
          : null
      };
    },
    getFilteredEmployee(options) {
      return {
        store: this.employee,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.ceo]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.BusinnesUnitDataFieldValueNotExists(
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
<style lang="scss" >
.container {
  display: block;
}
</style>
