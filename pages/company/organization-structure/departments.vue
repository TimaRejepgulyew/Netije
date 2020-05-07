<template>
  <main >
    <Header :headerTitle="$t('translations.menu.department')"></Header>
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
        :file-name="$t('translations.menu.departments')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Department" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="allowDeleting"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')" :visible="false" />

      <DxColumn data-field="code" :caption="$t('translations.fields.code')" :visible="false">
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('translations.validation.valueMustNotContainsSpaces')"
        />
        <DxAsyncRule
          :ignore-empty-value="true"
          :message="$t('translations.fields.codeAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="shortName" :caption="$t('translations.fields.shortName')"></DxColumn>

      <DxColumn
        data-field="headOfficeId"
        :caption="$t('translations.fields.headOfficeId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveHeadOffices"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="managerId" :caption="$t('translations.fields.managerId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveEmployees"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="businessUnitId"
        :caption="$t('translations.fields.businessUnitId')"
        :set-cell-value="onBusinessUnitIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
        <DxLookup :data-source="getActiveBussinessUnit" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>

      <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

      <template #masterDetailTemplate="data">
        <TabRole :data="data.data" memberList="Departments" />
      </template>

      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="value => onValueChanged(value, cellInfo.data)"
        ></textArea>
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import TabRole from "~/components/member-list/tabRole.vue";
import textArea from "~/components/page/textArea";
import {
  DxMasterDetail,
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
  DxPatternRule,
  DxRequiredRule,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
    TabRole,
    textArea,
    DxMasterDetail,
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxGrouping,
    DxGroupPanel,
    DxLookup,
    DxRequiredRule,
    DxPatternRule,
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
        loadUrl: dataApi.company.Department,
        insertUrl: dataApi.company.Department,
        updateUrl: dataApi.company.Department,
        removeUrl: dataApi.company.Department
      }),
      entityType: EntityType.Department,
      statusDataSource: this.$store.getters["status/status"](this),
      onBusinessUnitIdChanged(rowData, value) {
        rowData.code = rowData.code;
        this.defaultSetCellValue(rowData, value);
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    allowDeleting(e) {
      if (!e.row.data.isSystem) {
        return this.$store.getters["permissions/allowDeleting"](
          this.entityType
        );
      } else {
        return !e.row.data.isSystem;
      }
    },
    getActiveHeadOffices(options) {
      return {
        store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
        }),
        paginate: true,
        filter: options.data
          ? [ "businessUnitId","=", options.data.businessUnitId, "or", "status","=", Status.Active, "or","id","=", options.data.headOfficeId]
          : []
      };
    },
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.ceo]
          : []
      };
    },
    getActiveBussinessUnit(options) {
      return {
        store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.businessUnitId]
          : []
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      var businessUnitId = params.data.businessUnitId;
      return this.$customValidator.DepartmentDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value,
          businessUnitId
        },
        dataField
      );
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  }
};
</script>
