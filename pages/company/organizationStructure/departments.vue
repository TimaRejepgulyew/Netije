<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
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
        :file-name="$t('translations.menu.departments')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="Department"
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
          :message="$t('translations.fields.nameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="phone"
        :caption="$t('translations.fields.phones')"
        :visible="false"
      />

      <DxColumn
        data-field="code"
        :caption="$t('translations.fields.code')"
        :visible="false"
      />

      <DxColumn
        data-field="shortName"
        :caption="$t('translations.fields.shortName')"
      ></DxColumn>

      <DxColumn
        data-field="headOfficeId"
        :caption="$t('translations.fields.headOfficeId')"
        :visible="false"
      >
        <DxLookup
          :data-source="getFilteredHeadOffice"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="description"
        :caption="$t('translations.fields.description')"
        :visible="false"
      />

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
      />

      <DxColumn
        data-field="managerId"
        :caption="$t('translations.fields.managerId')"
      >
        <DxLookup
          :data-source="getFilteredManager"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="businessUnitId"
        :caption="$t('translations.fields.businessUnitId')"
        :set-cell-value="onBusinessUnitIdChanged"
      >
        <DxRequiredRule
          :message="$t('translations.fields.businessUnitIdRequired')"
        />
        <DxLookup
          :data-source="getFilteredBussinessUnit"
          value-expr="id"
          display-expr="name"
        />
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
      headerTitle: this.$t("translations.menu.department"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department,
        insertUrl: dataApi.company.Department,
        updateUrl: dataApi.company.Department,
        removeUrl: dataApi.company.Department
      }),

      statusStores: this.$store.getters["status/status"],

      managerStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      businessUnitStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
      }),

      headOfficeStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
       onBusinessUnitIdChanged(rowData, value) {
        rowData.headOfficeId = null;
        this.defaultSetCellValue(rowData, value);
      },

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredHeadOffice(options) {
      return {
        store: this.headOfficeStore,
        filter: options.data
          ? ["businessUnitId", "=", options.data.businessUnitId, "or","status", "=", 0, "or", "id", "=", options.data.headOfficeId]
          : null
      };
    },

    getFilteredManager(options) {
      return {
        store: this.managerStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.managerId]
          : null
      };
    },
    getFilteredBussinessUnit(options) {
      return {
        store: this.businessUnitStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.businessUnitId]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.DepartmentDataFieldValueNotExists(
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
