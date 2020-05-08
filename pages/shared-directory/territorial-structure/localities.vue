<template>
  <main >
    <Header :headerTitle="$t('menu.locality')"></Header>
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
      <DxGrouping :auto-expand-all="false" />
      <DxColumnChooser :enabled="true" />

      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.localityId')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Locality" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        mode="form"
        :useIcons="true"
      />
      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.localityId')">
        <DxRequiredRule :message="$t('translations.fields.localityIdRequired')" />
        <DxStringLengthRule :max="60" :message="$t('translations.fields.nameShouldNotBeMoreThan')" />
        <DxAsyncRule
                :reevaluate="false"
          :message="$t('translations.fields.localityAlreadyExists')"
          :validation-callback="validateLocalityName"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="regionId" :caption="$t('translations.fields.regionId')">
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveRegionsDataStore"
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
import Status from "~/infrastructure/constants/status";
import EntityType from '~/infrastructure/constants/entityTypes'
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
        loadUrl: dataApi.sharedDirectory.Locality,
        insertUrl: dataApi.sharedDirectory.Locality,
        updateUrl: dataApi.sharedDirectory.Locality,
        removeUrl: dataApi.sharedDirectory.Locality
      }),
      entityType: EntityType.Locality,
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
    getActiveRegionsDataStore(options) {
      return {
        store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region
      }),
      paginate: true,
      filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.regionId]
          : []
      };
    },
    validateLocalityName(params) {
      return this.$customValidator.isLocalityNotExists({
        id: params.data.id,
        name: params.value
      });
    }
  }
};
</script>