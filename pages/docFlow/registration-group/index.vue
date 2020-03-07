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
      :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
      @editor-preparing="blockingColumnForEdit"
    >
      >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.registrationGroup')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="RegistrationGroup"
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
        data-field="canRegisterIncoming"
        :caption="$t('translations.fields.canRegisterIncoming')"
        data-type="boolean"
        :visible="false"
      >
      </DxColumn>

      <DxColumn
        data-field="canRegisterOutgoing"
        :caption="$t('translations.fields.canRegisterOutgoing')"
        data-type="boolean"
        :visible="false"
      >
      </DxColumn>

      <DxColumn
        data-field="canRegisterInternal"
        :caption="$t('translations.fields.canRegisterInternal')"
        data-type="boolean"
        :visible="false"
      >
      </DxColumn>

      <DxColumn
        data-field="members"
        :caption="$t('translations.fields.members')"
        :visible="false"
        :cell-template="cellTemplate"
        edit-cell-template="tagBoxEditor"
        :calculate-filter-expression="calculateFilterExpression"
      >
        <DxLookup
          :data-source="employeeStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <template #tagBoxEditor="cellInfo">
        <EmployeeTagBoxComponent
          :value="cellInfo.data.value"
          :on-value-changed="value => onValueChanged(value, cellInfo.data)"
          :data-source="employeeStore"
          :data-grid-component="cellInfo.data.component"
        />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import EmployeeTagBoxComponent from "~/components/docFlow/registration-group/index__tag-box-component";
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
  DxTagBox
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";

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
    DxTagBox,
    EmployeeTagBoxComponent
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.registrationGroup"),
      store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.RegistrationGroup,
          insertUrl: dataApi.docFlow.RegistrationGroup,
          updateUrl: dataApi.docFlow.RegistrationGroup,
          removeUrl: dataApi.docFlow.RegistrationGroup
        }),

      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },
      employeeStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      calculateFilterExpression: (
        filterValue,
        selectedFilterOperation,
        target
      ) => {
        if (target === "search" && typeof filterValue === "string") {
          return [this.dataField, "contains", filterValue];
        }
        return function(data) {
          return (data.members || []).indexOf(filterValue) !== -1;
        };
      }
    };
  },
  methods: {
    getFilteredEmployee(options){
       return {
        store: this.employeeStore,
        filter: options.data
          ? ["id", "=", options.data.employeeId]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.RegistrationGroupDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    },
    cellTemplate(container, options) {
      var noBreakSpace = "\u00A0",
        text = (options.value || [])
          .map(element => {
            return options.column.lookup.calculateCellValue(element);
          })
          .join(", ");
      container.textContent = text || noBreakSpace;
      container.title = text;
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    blockingColumnForEdit(e) {
      if (e.row) {
        if (e.dataType == "boolean" && parseInt(e.row.key) && e.row.isEditing) {
          e.editorOptions.disabled = true;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: block;
}
</style>
