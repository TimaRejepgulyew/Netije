<template>
  <main class="container container--grid">
    <h1>{{ $t("translations.menu.person") }}</h1>
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
        :file-name="$t('translations.fields.person')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Person" />

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

      <DxColumn
        data-field="firstName"
        :caption="$t('translations.fields.firstName')"
        :hint="$t('translations.fields.countryAlreadyAxists')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="lastName"
        :caption="$t('translations.fields.lastName')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="middleName"
        :caption="$t('translations.fields.middleName')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="dateOfBirth"
        :caption="$t('translations.fields.dateOfBirth')"
        data-type="date"
      >
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="sex" :caption="$t('translations.fields.sex')" data-type="string">
        <DxLookup :data-source="sex" value-expr="id" display-expr="name"></DxLookup>
      </DxColumn>

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')" :visible="false">
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="code" :caption="$t('translations.fields.code')" :visible="false"></DxColumn>

      <DxColumn
        data-field="regionId"
        :caption="$t('translations.fields.regionId')"
        :set-cell-value="onRegionIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup :data-source="getFilteredRegion" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="localityId" :caption="$t('translations.fields.localityId')">
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup :data-source="getFilteredLocality" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="postAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')" :visible="false"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')" :visible="false"></DxColumn>

      <DxColumn data-field="webSite" :caption="$t('translations.fields.webSite')"></DxColumn>

      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false"></DxColumn>

      <DxColumn
        data-field="nonresident"
        :visible="false"
        data-type="boolean"
        :caption="$t('translations.fields.nonresident')"
      ></DxColumn>

      <DxColumn data-field="account" :caption="$t('translations.fields.account')"></DxColumn>

      <DxColumn data-field="bankId" :caption="$t('translations.fields.bankId')">
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup :data-source="getFilteredBank" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="type" :caption="$t('translations.fields.type')" :visible="false"></DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
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
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Person,
        insertUrl: dataApi.contragents.Person,
        updateUrl: dataApi.contragents.Person,
        removeUrl: dataApi.contragents.Person
      }),

      statusStores: this.$store.getters["status/status"],

      sex: [
        { id: 0, name: "Мужской" },
        { id: 1, name: "Женский" }
      ],

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

    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.PersonDataFieldValueNotExists(
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
.container {
  display: block;
}
</style>
