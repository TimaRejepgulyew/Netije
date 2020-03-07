<template>
  <main class="container container--grid">
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

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.contacts')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="DocumentRegister-detail" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">

      </DxColumn>
      <DxColumn
        data-field="bussinessUnitId"
        :caption="$t('translations.fields.bussinessUnitId')"
        :visible="true"
      >
        <DxLookup :data-source="getFilteredCompany" value-expr="id" display-expr="name" />
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
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
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
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
  },
  props: {
    documentRegistry: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let { name, id } = this.company.data;
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docflow.DocumentRegistry,
        }),
        filter: ["companyId", "=", id]
      }),

      statusStores: this.$store.getters["status/status"],

      companyStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Company
      }),

      initNewRow: e => {
        e.data.companyId = id;
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredCompany(options) {
      return {
        store: this.companyStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.companyId]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CompanyDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
