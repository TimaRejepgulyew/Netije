<template>
  <main class="container container--grid">
    <DxDataGrid
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        :height="600"
        @row-updating="rowUpdating"
        @init-new-row="initNewRow">
      >
      <DxHeaderFilter :visible="true" />
      <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" />
      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search')+'...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.countryId')"
        alignment="left"
        data-type="string"
      />

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="customStores" value-expr="id" display-expr="status" />
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
  mounted() {},
  data() {
    return {
      store: this.$dxStore({
        loadUrl: dataApi.Country,
        insertUrl: dataApi.Country,
        updateUrl: dataApi.Country,
        removeUrl: dataApi.Country
      }),
      customStores: this.$store.getters["general-handbook/countryStatus"],
      initNewRow: e => {
        e.data.status = this.Status[0].id
      },
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>