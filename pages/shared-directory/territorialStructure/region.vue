<template>
  <main>
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      id="gridContainer"
      :repaint-changes-only="true"
      :highlight-changes="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping
        :auto-expand-all="false"
        &#x26;#x26;#x26;#x26;#x26;#x3C;DxSelection
        mode="multiple"
      />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.regionId')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Region" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        mode="form"
        :useIcons="true"
      />

      <DxSearchPanel position="after" :visible="true" />

      <DxScrolling mode="virtual" />
      <DxColumn data-field="name" :caption="$t('translations.fields.regionId')">
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxStringLengthRule :max="60" :message="$t('translations.fields.nameShouldNotBeMoreThan')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyExists')"
          :validation-callback="validateRegionName"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="countryId" :caption="$t('translations.fields.countryId')">
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredCountry"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
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
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxRequiredRule,
  DxAsyncRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxStringLengthRule
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
    DxGrouping,
    DxGroupPanel,
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxStringLengthRule
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.region"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region,
        insertUrl: dataApi.sharedDirectory.Region,
        updateUrl: dataApi.sharedDirectory.Region,
        removeUrl: dataApi.sharedDirectory.Region
      }),
      entityType: "Region",
      statusStores: this.$store.getters["status/status"],
      country: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Country
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
      return this.$customValidator.isRegionNotExists({
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
</style>
