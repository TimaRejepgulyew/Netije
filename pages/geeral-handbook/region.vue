<template>
  <main class="container container--grid">
    <h1>{{ $t("translations.menu.region") }}</h1>
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

      <DxColumnChooser :enabled="true"/>
      <DxColumnFixing :enabled="true"/>

       <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        file-name="Region"
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
        :visible="true"
        :placeholder="$t('translations.fields.search') + '...'"
      />

      <DxScrolling mode="virtual" />
      <DxColumn data-field="name" :caption="$t('translations.fields.regionId')">
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateRegionName"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="countryId"
        :caption="$t('translations.fields.countryId')"
      >
        <DxLookup
          :data-source="getFilteredCountry"
          value-expr="id"
          display-expr="name"
        />
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
   DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing
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
  DxColumnFixing
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Region,
        insertUrl: dataApi.Region,
        updateUrl: dataApi.Region,
        removeUrl: dataApi.Region
      }),

      statusStores: this.$store.getters["general-handbook/Status"],

      country: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Country
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
    getFilteredCountry(options) {
      return {
        store: this.country,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.countryId]
          : null
      };
    },
    validateRegionName(params) {
      return this.$customValidator.isHumanSettlementNotExists({
        id: params.data.id,
        name: params.value
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
.container {
  display: block;
}
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>
