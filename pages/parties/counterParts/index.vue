<template>
  <main class="container container--grid">
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
    >
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport :enabled="true" :allow-export-selected-data="true" :file-name="$t('translations.menu.counterPartList')" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="CounterParts" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption:'' data-type="string"></DxColumn>

      <DxColumn data-field="headCompanyId" :visible="false">
        <DxLookup :data-source="store" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="legalName" :visible="false"></DxColumn>

      <DxColumn data-field="tin" :visible="false"></DxColumn>

      <DxColumn data-field="code"></DxColumn>

      <DxColumn data-field="regionId">
        <DxLookup :data-source="getFilteredRegion" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="localityId">
        <DxLookup :data-source="getFilteredLocality" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="legalAddress" :visible="false"></DxColumn>

      <DxColumn data-field="postAddress" :visible="false"></DxColumn>

      <DxColumn data-field="phones" :visible="false"></DxColumn>

      <DxColumn data-field="email" :visible="false"></DxColumn>

      <DxColumn data-field="webSite"></DxColumn>

      <DxColumn data-field="note" :visible="false"></DxColumn>

      <DxColumn data-field="nonresident" :visible="false" data-type="boolean"></DxColumn>

      <DxColumn data-field="account"></DxColumn>

      <DxColumn data-field="bankId">
        <DxLookup :data-source="getFilteredBank" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="type" :visible="false"></DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import dxlocalization from 'devextreme/localization'
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
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
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },
  created(){
    console.log(dxlocalization,'locale');
    dxlocalization.locale('de');
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
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
      })
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
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: block;
}
</style>
