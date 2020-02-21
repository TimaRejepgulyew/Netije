<template>
  <main class="container container--grid">
    <h1>{{$t("translations.menu.countries")}}</h1>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxHeaderFilter :visible="true" />
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search')+'...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.countryId')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateCountryName"
        ></DxAsyncRule>
      </DxColumn>

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
  DxRequiredRule
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
    DxAsyncRule
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Country,
        insertUrl: dataApi.Country,
        updateUrl: dataApi.Country,
        removeUrl: dataApi.Country
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
    validateCountryName(params) {
      return this.$customValidator.isCountryNotExists({
        id: params.data.id,
        name: params.value
      });
    }
  }
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>