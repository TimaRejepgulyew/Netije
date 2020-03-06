<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
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
        :file-name="$t('translations.fields.fileTypes')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="FileTypes"
      />

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
        :caption="$t('translations.fields.name')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
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
import dataApi from "~/static/dataApi";
import CustomStore from "devextreme/data/custom_store";
import Header from "~/components/page/page__header";
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
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
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
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.filesType"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.FilesType,
        insertUrl: dataApi.docFlow.FilesType,
        updateUrl: dataApi.docFlow.FilesType,
        removeUrl: dataApi.docFlow.FilesType
      }),

      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },

    };
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.FilesTypeDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    },
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: block;
}
</style>
