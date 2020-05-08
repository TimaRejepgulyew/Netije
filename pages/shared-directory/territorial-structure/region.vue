<template>
  <main>
    <Header :headerTitle="$t('menu.region')"></Header>
    <DxDataGrid
      id="gridContainer"      
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false"/>
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
                :reevaluate="false"
          :message="$t('translations.fields.regionAlreadyExists')"
          :validation-callback="validateRegionName"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="countryId" :caption="$t('translations.fields.countryId')">
        <DxRequiredRule :message="$t('translations.fields.countryIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveCountriesDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
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
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxStringLengthRule
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region,
        insertUrl: dataApi.sharedDirectory.Region,
        updateUrl: dataApi.sharedDirectory.Region,
        removeUrl: dataApi.sharedDirectory.Region
      }),
      entityType: EntityType.Region,
      statusDataSource: this.$store.getters["status/status"](this)
    }
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    getActiveCountriesDataSource(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Country
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.countryId]
          : []
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
