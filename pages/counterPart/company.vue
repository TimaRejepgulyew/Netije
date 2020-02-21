<template>
  <main class="container container--grid">
    <h1>{{ $t("translations.menu.company") }}</h1>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        file-name="Countries"
      />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true"/>
      <DxColumnFixing :enabled="true"/>

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
        data-field="name"
        data-type="string"
      >
        <DxRequiredRule
          :message="$t('translations.fields.countryIdRequired')"
        />
        <!-- <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateCountryName"
        ></DxAsyncRule> -->
      </DxColumn>

      <DxColumn
        data-field="headCompanyId"
      >
      </DxColumn>

      <DxColumn
        data-field="legalName"
      >
      </DxColumn>

      <DxColumn
        data-field="tin"
      >
      </DxColumn>

      <DxColumn
        data-field="tin"
      >
      </DxColumn>

      <DxColumn
        data-field="code"
      >
      </DxColumn>

      <DxColumn
        data-field="regionId"
      >
      <DxLookup
          :data-source="getFilteredRegion"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="localityId"
      >
      <DxLookup
          :data-source="getFilteredLocality"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
      >
      </DxColumn>

      <DxColumn
        data-field="postAddress"
      >
      </DxColumn>

      <DxColumn
        data-field="phones"
      >
      </DxColumn>

      <DxColumn
        data-field="email"
      >
      </DxColumn>

      <DxColumn
        data-field="webSite"
      >
      </DxColumn>

      <DxColumn
        data-field="note"
      >
      </DxColumn>

      <DxColumn
        data-field="nonresident"
      >
      </DxColumn>

      <DxColumn
        data-field="account"
      >
      </DxColumn>

      <DxColumn
        data-field="bankId"
      >
      </DxColumn>

      <DxColumn
        data-field="type"
      >
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
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing
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
        loadUrl: dataApi.contragents.Company,
        insertUrl: dataApi.contragents.Company,
        updateUrl: dataApi.contragents.Company,
        removeUrl: dataApi.contragents.Company
      }),

      statusStores: this.$store.getters["general-handbook/Status"],

      region: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region
      }),

      locality: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Locality
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
          ? ["status", "=", 0, "or", "id", "=", options.data.localityId]
          : null
      };
    },
    // validateCompanyName(params) {
    //   return this.$customValidator.isCountryNotExists({
    //     id: params.data.id,
    //     name: params.value
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
.container--grid {
  border: 5.5px solid $base-border-color;
}
</style>
