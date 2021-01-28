<template>
  <main>
    <Header :headerTitle="$t('menu.businessUnit')"></Header>
    <DxTreeList
      ref="bussinesUnit"
      remoteOperations: { filtering: true,sorting: true,grouping: true }
      parent-id-expr="headCompanyId"
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
      :onRowDblClick="selectBussinesUnit"
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
        storage-key="businessUnit"
      />
      <DxEditing
        :allow-updating="
          $store.getters['permissions/allowUpdating'](entityType)
        "
        :allow-deleting="allowDeleting"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
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
        data-field="headCompanyId"
        :caption="$t('companyStructure.fields.headCompany')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="companyStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn data-field="code" :caption="$t('shared.code')" :visible="false">
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
        data-field="tin"
        :caption="$t('translations.fields.tin')"
        :visible="false"
      >
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('translations.fields.tinRule')"
        />
      </DxColumn>
      <DxColumn
        data-field="regionId"
        :caption="$t('translations.fields.regionId')"
        :set-cell-value="onRegionIdChanged"
      >
        <DxRequiredRule :message="$t('translations.fields.regionIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveRegions"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="localityId"
        :caption="$t('translations.fields.localityId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveLocalities"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="phones"
        :caption="$t('translations.fields.phones')"
      />
      <DxColumn
        data-field="legalName"
        :caption="$t('translations.fields.legalName')"
        :visible="false"
      >
        <DxRequiredRule
          :message="$t('translations.fields.legalNameRequired')"
        />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      />

      <DxColumn
        data-field="postalAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      />

      <DxColumn
        data-field="ceo"
        :caption="$t('translations.fields.ceo')"
        :visible="true"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveEmployees"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="email"
        :caption="$t('translations.fields.email')"
        :visible="false"
      >
        <DxEmailRule :message="$t('translations.fields.emailRule')" />
      </DxColumn>

      <DxColumn
        data-field="homepage"
        :caption="$t('translations.fields.webSite')"
        :visible="false"
      />

      <DxColumn
        data-field="account"
        :caption="$t('translations.fields.account')"
        :visible="false"
      />

      <DxColumn
        data-field="bankId"
        :caption="$t('translations.fields.bankId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveBanks"
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

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>

      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="(value) => onValueChanged(value, cellInfo.data)"
        ></textArea>
      </template>
    </DxTreeList>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import textArea from "~/components/page/textArea";
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
  DxEmailRule,
  DxColumnFixing
} from "devextreme-vue/tree-list";

export default {
  components: {
    textArea,
    Header,
    DxSearchPanel,
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
    DxEmailRule,
    DxTreeList,
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit,
        insertUrl: dataApi.company.BusinessUnit,
        updateUrl: dataApi.company.BusinessUnit,
        removeUrl: dataApi.company.BusinessUnit,
      }),
      entityType: EntityType.BusinessUnit,
      statusDataSource: this.$store.getters["status/status"](this),
      onRegionIdChanged(rowData, value) {
        rowData.localityId = null;
        this.defaultSetCellValue(rowData, value);
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      companyStore: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.BusinessUnit,
        }),
        paginate: true,
        filter: ["status", "=", Status.Active],
      },
    };
  },
  methods: {
    selectBussinesUnit(e){
      this.$refs["bussinesUnit"].instance.editRow(e.rowIndex);
    },
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
      if(e.data.headCompanyId === 0){
        e.data.headCompanyId = null
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
    getActiveRegions(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Region,
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
              options.data.regionId,
            ]
          : undefined,
      };
    },
    getActiveLocalities(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Locality,
        }),
        paginate: true,
        filter: options.data
          ? [
              "regionId",
              "=",
              options.data.regionId,
              "or",
              "status",
              "=",
              Status.Active,
              "or",
              "id",
              "=",
              options.data.localityId,
            ]
          : undefined,
      };
    },
    getActiveBanks(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.Bank,
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.bankId]
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
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.BusinnesUnitDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value,
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
