<template>
  <main>
    <Header :headerTitle="$t('menu.filesType')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :errorRowEnabled="false"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.fileTypes')"
      />
      <DxFilterRow :visible="true" />

      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="FileTypes" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
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
import EntityType from "~/infrastructure/constants/entityTypes";
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
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
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
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.FilesType,
        insertUrl: dataApi.docFlow.FilesType,
        updateUrl: dataApi.docFlow.FilesType,
        removeUrl: dataApi.docFlow.FilesType
      }),
      entityType: EntityType.FilesType,
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    }
  }
};
</script>

