<template>
  <main class="container container--grid">
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      >
      <DxHeaderFilter :visible="true" />
      <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" :useIcons="true" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search')+'...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.currencyId')"
        alignment="left"
        data-type="string"
      ></DxColumn>

      <DxColumn data-field="alphaCode" :caption="$t('translations.fields.alphaCode')"></DxColumn>
      <DxColumn data-field="shortName" :caption="$t('translations.fields.shortName')"></DxColumn>
      <DxColumn data-field="fractionName" :caption="$t('translations.fields.fractionName')"></DxColumn>
      <DxColumn data-field="isDefault" data-type="boolean" :caption="$t('translations.fields.isDefault')"></DxColumn>
      <DxColumn data-field="numericCode"  :caption="$t('translations.fields.numericCode')"></DxColumn>
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
  DxRequiredRule
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
    DxLookup,
    DxRequiredRule
  },
  mounted() {},
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Currency,
        insertUrl: dataApi.Currency,
        updateUrl: dataApi.Currency,
        removeUrl: dataApi.Currency
      }),
      statusStores: this.$store.getters["general-handbook/countryStatus"],
      
      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
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