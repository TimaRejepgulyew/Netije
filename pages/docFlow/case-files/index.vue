<template>
  <main>
    <Header :headerTitle="$t('translations.menu.caseFile')"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
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
        :file-name="$t('translations.fields.caseFile')"
      />
      <DxFilterRow :visible="true" />

      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="CaseFile" />

      <DxEditing
        :allow-updating="isAllowUpdating"
        :allow-deleting="isAllowDeleting"
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
      >
        <DxRequiredRule :message="$t('translations.fields.startDateRequired')" />
      </DxColumn>

      <DxColumn data-field="endDate" :caption="$t('translations.fields.endDate')" data-type="date">
        <DxRequiredRule :message="$t('translations.fields.endDateRequired')" />
        <DxCustomRule
          :message="$t('translations.validation.caseFile.endDateLessThanBegin')"
          :validation-callback="validEndDate"
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
          :data-source="getAvailableRetentionPeriod"
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
          :data-source="getAvailableDepartment"
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
          :data-source="getAvailableRegistrationGroups"
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
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxCustomRule
  },

  data() {
    return {
      entityType: EntityType.CaseFile,
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.CaseFile,
        insertUrl: dataApi.docFlow.CaseFile,
        updateUrl: dataApi.docFlow.CaseFile,
        removeUrl: dataApi.docFlow.CaseFile
      }),
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    validEndDate(e){
      if (Date.parse(e.data.startDate) < Date.parse(e.value)) {
          return true;
        }
        return false;
    },
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    isAllowUpdating(e) {
      return this.canOperateWithCaseFile(e.row.data,"allowUpdating")
    },
    isAllowDeleting(e) {
      return this.canOperateWithCaseFile(e.row.data,"allowDeleting")
    },
    canOperateWithCaseFile(caseFile,permission)
    {
      const employeeId = this.$store.getters["permissions/employeeId"];
      if(this.$store.getters['permissions/IsAdmin'])
          return true;
       if (!this.$store.getters[`permissions/${permission}`](this.entityType))
          return false;
       if (caseFile.registrationGroupResponsibleId==employeeId || !caseFile.registrationGroupResponsibleId)
          return true;
      return false;
    },
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
    getAvailableDepartment(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Department
        }),
        paginate:true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.departmentId]
          : null
      };
    },
    getAvailableRetentionPeriod(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.FileRetentionPeriod
        }),
        paginate:true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.retentionPeriodId]
          : null
      }
    },
    getAvailableRegistrationGroups(options) {
      let filter = [];
      filter.push(["status", "=", Status.Active]);
       if(!this.$store.getters['permissions/IsAdmin'])
       {
         filter.push("and");
         filter.push(["responsibleEmployeeId", "=", +this.$store.getters["permissions/employeeId"]]);
       }

      return {
        store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.RegistrationGroup
      }),
      paginate:true,
      filter: options.data
          ? filter
          : []
      }
    }
  }
}
</script>
