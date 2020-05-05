<template>
  <main >
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.caseFile')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="CaseFile" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="title" :caption="$t('translations.fields.title')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.titleRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.titleAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="index" :caption="$t('translations.fields.index')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.indexRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.indexAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="startDate"
        :caption="$t('translations.fields.startDate')"
        data-type="date"
        :set-cell-value="editStartDate"
      >
        <DxRequiredRule :message="$t('translations.fields.startDateRequired')" />
      </DxColumn>

      <DxColumn data-field="endDate" :caption="$t('translations.fields.endDate')" data-type="date">
        <DxRequiredRule :message="$t('translations.fields.endDateRequired')" />
        <DxCustomRule
          :message="$t('translations.fields.endDateAlreadyExists')"
          :validation-callback="editEndDate"
          type="custom"
          :reevaluate="true"
        ></DxCustomRule>
      </DxColumn>

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        data-type="string"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="retentionPeriodId"
        :caption="$t('translations.fields.retentionPeriodId')"
      >
        <DxRequiredRule :message="$t('translations.fields.retentionPeriodIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredRetentionPeriod"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="location"
        :caption="$t('translations.fields.location')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="departmentId" :caption="$t('translations.fields.departmentId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredDepartment"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="registrationGroupId"
        :caption="$t('translations.fields.registrationGroupId')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="registrationGroupStore"
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
  DxGrouping,
  DxGroupPanel,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxCustomRule
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
    DxCustomRule
  },
  mounted() {},
  data() {
    return {
      headerTitle: this.$t("translations.menu.caseFile"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.CaseFile,
        insertUrl: dataApi.docFlow.CaseFile,
        updateUrl: dataApi.docFlow.CaseFile,
        removeUrl: dataApi.docFlow.CaseFile
      }),
      entityType: "CaseFile",
      statusStores: this.$store.getters["status/status"](this),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      departmentStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
      retentionPeriodStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.FileRetentionPeriod
      }),
      registrationGroupStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.ResponsibleForGroupOnMe
      }),
      editStartDate(rowData, value) {
        rowData.endDate = value;
        this.defaultSetCellValue(rowData, value);
      },
      editEndDate: e => {
        if (Date.parse(e.data.startDate) < Date.parse(e.value)) {
          return true;
        }
        return false;
      }
    };
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CaseFileDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    },
    getFilteredDepartment(options) {
      return {
        store: this.departmentStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.departmentId]
          : null
      };
    },
    getFilteredRetentionPeriod(options) {
      return {
        store: this.retentionPeriodStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.retentionPeriodId]
          : null
      };
    }
  }
};
</script>
