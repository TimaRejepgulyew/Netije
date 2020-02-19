<template>
  <main class="container">
    <div>
      <DxDataGrid
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        @row-updating="rowUpdating"
        @init-new-row="initNewRow"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" :useIcons="true"/>
        <DxSearchPanel
          position="after"
          :visible="true"
          :placeholder="$t('translations.fields.search')+'...'"
        />
        <DxScrolling mode="virtual" />
        
        <DxColumn data-field="name" :caption="$t('translations.fields.localityId')" />

        <DxColumn data-field="regionId" :caption="$t('translations.fields.regionId')">
          <DxLookup :data-source="getFilteredRegion" value-expr="id" display-expr="name" />
        </DxColumn>

        <DxColumn data-field="status" :caption="$t('translations.fields.status')">
          <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
        </DxColumn>
      </DxDataGrid>
    </div>
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
  DxLookup
} from "devextreme-vue/data-grid";

export default {
  middleware: "authorization",
  components: {
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Locality,
        insertUrl: dataApi.Locality,
        updateUrl: dataApi.Locality,
        removeUrl: dataApi.Locality
      }),
      statusStores: this.$store.getters["general-handbook/countryStatus"],

      country: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Region
      }),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredRegion(options) {
      return {
        store: this.country,
        filter: options.data ? ["status", "=", 0, 'or', 'id', '=', options.data.regionId] : null
      };
    }
  }
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
</style>