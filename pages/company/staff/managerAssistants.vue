<template>
  <main class="container container--grid">
    <h1 class="grid--title">{{ $t("translations.menu.managerAssistants") }}</h1>
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
        :file-name="$t('translations.menu.jobTitle')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="JobTitle"
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
        data-field="managerId"
        :caption="$t('translations.fields.managerId')"
        :set-cell-value="onManagerIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup
          :data-source="getFilteredManager"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>


      <DxColumn
        data-field="assistantId"
        :caption="$t('translations.fields.assistantId')"
        :set-cell-value="onAssistantIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.assistantIdRequired')" />
        <DxLookup
          :data-source="getFilteredAssistant"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>PreparesResolution

        <DxColumn
        data-field="preparesResolution"
        :caption="$t('translations.fields.preparesResolution')"
        data-type="boolean"
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
  DxStateStoring
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
    DxStateStoring
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.ManagersAssistant,
        insertUrl: dataApi.company.ManagersAssistant,
        updateUrl: dataApi.company.ManagersAssistant,
        removeUrl: dataApi.company.ManagersAssistant
      }),

      statusStores: this.$store.getters["status/status"],

      employeeStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },

       onManagerIdChanged(rowData, value) {
        this.defaultSetCellValue(rowData, value);
      },

       onAssistantIdChanged(rowData, value) {
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    getFilteredManager(options) {
      return {
        store: this.employeeStore,
        filter: options.data
          ? ["id", "<>", options.data.assistantId, "or","status", "=", 0]
          : null
      };
    },
    getFilteredAssistant(options) {
      console.log(options)
      return {
        store: this.employeeStore,
        filter: options.data
          ? ["id", "<>", options.data.managerId, "or", "status", "=", 0]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.ManagerAssistantDataFieldValueNotExists(
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
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
