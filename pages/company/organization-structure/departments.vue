<template>
  <main>
    <DxPopup
      :visible.sync="popupState"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      height="auto"
      position="top"
    >
      <div>
        <div v-if="popupState" >
          <member-list  :data="currentEmployee" />
        </div>
      </div>
    </DxPopup>
    <Header :headerTitle="$t('menu.department')"></Header>
    <div>
      <DxTreeList
         remoteOperations: { filtering: true,sorting: true,grouping: true }
        parent-id-expr="headOfficeId"
        :data-source="dataSource"
        :errorRowEnabled="false"
        :show-borders="true"
        :column-auto-width="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :load-panel="{
          enabled: true,
          indicatorSrc: require('~/static/icons/loading.gif'),
        }"
        @row-updating="onRowUpdating"
        @init-new-row="onInitNewRow"
      >
        <DxSearchPanel position="after" :visible="true" />
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxColumnChooser :enabled="true" />
        <DxColumnFixing :enabled="true" />
        <DxScrolling mode="virtual" />
        <DxStateStoring
          :enabled="true"
          type="localStorage"
          storage-key="department"
        />

        <DxEditing
          :allow-updating="
            $store.getters['permissions/allowUpdating'](entityType)
          "
          :allow-deleting="allowDeleting"
          :allow-adding="
            $store.getters['permissions/allowCreating'](entityType)
          "
          :useIcons="true"
          mode="form"
        />

        <DxColumn
          data-field="name"
          :caption="$t('shared.name')"
          data-type="string"
        >
          <DxRequiredRule :message="$t('shared.nameRequired')" />
        </DxColumn>

        <DxColumn
          data-field="phone"
          :caption="$t('translations.fields.phones')"
          :visible="false"
        />

        <DxColumn
          data-field="code"
          :caption="$t('shared.code')"
          :visible="false"
        >
          <DxRequiredRule :message="$t('shared.codeRequired')" />
          <DxPatternRule
            :ignore-empty-value="false"
            :pattern="codePattern"
            :message="$t('validation.valueMustNotContainsSpaces')"
          />
          <DxAsyncRule
            :reevaluate="false"
            :ignore-empty-value="true"
            :message="$t('shared.codeAlreadyExists')"
            :validation-callback="validateEntityExists"
          ></DxAsyncRule>
        </DxColumn>

        <DxColumn
          data-field="shortName"
          :caption="$t('shared.shortName')"
        ></DxColumn>

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

        <DxColumn
          data-field="managerId"
          :caption="$t('translations.fields.managerId')"
        >
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
          <DxRequiredRule
            :message="$t('translations.fields.businessUnitIdRequired')"
          />
          <DxLookup
            :data-source="getActiveBussinessUnit"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>

        <DxColumn
          data-field="status"
          :caption="$t('translations.fields.status')"
        >
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
        <DxColumn :width="110" :buttons="editButtons" type="buttons" />
        <!--   <DxMasterDetail
        :enabled="$store.getters['permissions/allowReading'](employeeEntityType)"
        template="masterDetailTemplate"
      /> -->

        <template #masterDetailTemplate="data">
          <custom-popup :show="true">
            <member-list :data="data.data" />
          </custom-popup>
        </template>
        <template #textAreaEditor="cellInfo">
          <textArea
            :value="cellInfo.data.value"
            :on-value-changed="(value) => onValueChanged(value, cellInfo.data)"
          ></textArea>
        </template>
      </DxTreeList>
    </div>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import MemberList from "~/components/department/master-detail-member-list";
import textArea from "~/components/page/textArea";
import { DxPopup } from "devextreme-vue/popup";
import {
  DxTreeList,
  DxColumn,
  DxFilterRow,
  DxRequiredRule,
  DxAsyncRule,
  DxPatternRule,
  DxExport,
  DxEditing,
  DxColumnChooser,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxLookup,
  DxScrolling,
  DxStateStoring,
  DxColumnFixing,
} from "devextreme-vue/tree-list";
export default {
  components: {
    MemberList,
    textArea,
    DxColumn,
    Header,
    DxSearchPanel,
    DxTreeList,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxRequiredRule,
    DxPatternRule,
    DxAsyncRule,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPopup,
  },
  data() {
    return {
      currentEmployee: null,
      employeeEntityType: EntityType.Employee,
      entityType: EntityType.Department,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department,
        insertUrl: dataApi.company.Department,
        updateUrl: dataApi.company.Department,
        removeUrl: dataApi.company.Department,
      }),
      statusDataSource: this.$store.getters["status/status"](this),
      onBusinessUnitIdChanged(rowData, value) {
        rowData.code = rowData.code;
        this.defaultSetCellValue(rowData, value);
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      popupState: false,
    };
  },
  computed: {
    editButtons() {
      return [
        {
          hint: this.$t("translations.fields.members"),
          icon: "card",
          visible: this.$store.getters["permissions/allowReading"](
            this.employeeEntityType
          ),
          onClick: (e) => {
            (this.currentEmployee = e.row.data),
            this.openPopup();
          },
        },
        "add",
        "edit",
        "delete",
      ];
    },
  },
  methods: {
    openPopup() {
      this.popupState = !this.popupState;
    },
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
      if(e.data.headOfficeId === 0){
        e.data.headOfficeId = null
      }  
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
          loadUrl: dataApi.company.Department,
        }),
        paginate: true,
        filter: options.data
          ? [
              "businessUnitId",
              "=",
              options.data.businessUnitId,
              "or",
              "status",
              "=",
              Status.Active,
              "or",
              "id",
              "=",
              options.data.headOfficeId,
            ]
          : undefined,
      };
    },
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.ceo]
          : undefined,
      };
    },
    getActiveBussinessUnit(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit,
        }),
        paginate: true,
        filter: options.data
          ? [
              "status",
              "=",
              Status.Active,
              "or",
              "id",
              "=",
              options.data.businessUnitId,
            ]
          : undefined,
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      var businessUnitId = params.data.businessUnitId;
      return this.$customValidator.DepartmentDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value,
          businessUnitId,
        },
        dataField
      );
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
  },
};
</script>
