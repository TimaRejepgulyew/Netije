<template>
  <main>
    <Header :headerTitle="$t('translations.menu.managersAssistant')"></Header>
    <DxDataGrid
      id="gridContainer"      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.managersAssistant')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="managersAssistant" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="managerId"
        :caption="$t('translations.fields.managerId')"
        :set-cell-value="onManagerIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.managerIdRequired')" />
        <DxLookup
          :allow-clearing="true"
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
          :allow-clearing="true"
          :data-source="getFilteredAssistant"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="preparesResolution"
        :caption="$t('translations.fields.preparesResolution')"
        data-type="boolean"
      ></DxColumn>

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
  DxAsyncRule,
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
    DxAsyncRule,
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
        loadUrl: dataApi.company.ManagersAssistant,
        insertUrl: dataApi.company.ManagersAssistant,
        updateUrl: dataApi.company.ManagersAssistant,
        removeUrl: dataApi.company.ManagersAssistant
      }),
      entityType: EntityType.ManagersAssistant,
      statusDataSource: this.$store.getters["status/status"](this),

      employeeStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      onManagerIdChanged(rowData, value) {
        this.defaultSetCellValue(rowData, value);
      },

      onAssistantIdChanged(rowData, value) {
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    getFilteredManager(options) {
      return {
        store: this.employeeStore,
        filter: options.data
          ? ["id", "<>", options.data.assistantId, "or", "status", "=", Status.Active]
          : []
      };
    },
    getFilteredAssistant(options) {
      return {
        store: this.employeeStore,
        filter: options.data
          ? ["id", "<>", options.data.managerId, "or", "status", "=", Status.Active]
          : []
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
</style>
