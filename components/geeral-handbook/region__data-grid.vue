<template>
  <main class="container container--grid">
    <div>
      <DxDataGrid
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        @row-updating="rowUpdating"
        @init-new-row="initNewRow"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" />
        <DxSearchPanel
          position="after"
          :visible="true"
          :placeholder="$t('translations.fields.search')+'...'"
        />
        <DxScrolling mode="virtual" />
        <DxColumn data-field="name" :caption="$t('translations.fields.regionId')" />
        <DxColumn
          data-field="countryId"
          :caption="$t('translations.fields.countryId')"
          data-type="number"
        >
          <DxLookup :data-source="getFilteredStatus" value-expr="id" display-expr="name" />
        </DxColumn>

        <DxColumn data-field="status" :caption="$t('translations.fields.status')">
          <DxLookup :data-source="customStores" value-expr="id" display-expr="status" />
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
        loadUrl: dataApi.Region,
        insertUrl: dataApi.Region,
        updateUrl: dataApi.Region,
        removeUrl: dataApi.Region
        // errorHandler : function(e){

        // }
      }),
      customStores: this.$store.getters["general-handbook/countryStatus"],
      country: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Country
      }),
      initNewRow: e=>{
          e.data.status = this.customStores[0].id
      },
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredStatus(options){
      return {
        store: this.country,
        filter: options.data ? ['status', '=', 0] : null
      };
    },
  }
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
.container {
  display: block;
}
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>