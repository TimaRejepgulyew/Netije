<template>
  <main>
    <Header :headerTitle="$t('menu.businessUnit')"></Header>
    <DxTreeList
      :data-source="dataSource"
      :show-borders="true"
      parent-id-expr="headCompanyId"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
    >
      <DxSearchPanel position="after" :visible="true" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
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
        data-field="tin"
        :caption="$t('translations.fields.tin')"
        :visible="false"
      >
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('translations.fields.tinRule')"
        />
        <DxAsyncRule
          :reevaluate="false"
          :ignore-empty-value="true"
          :message="$t('translations.fields.tinAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
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
    <!-- <DxDataGrid
      id="gridContainer"
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="BusinessUnit"
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
      <DxScrolling mode="virtual" />
    </DxDataGrid> -->
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
  // DxSearchPanel,
  DxDataGrid,
  // DxColumn,
  // DxEditing,
  // DxHeaderFilter,
  DxScrolling,
  // DxLookup,
  DxGrouping,
  DxGroupPanel,
  // DxAsyncRule,
  // DxPatternRule,
  // DxRequiredRule,
  // DxExport,
  DxColumnChooser,
  DxColumnFixing,
  // DxFilterRow,
  DxStateStoring,
  DxEmailRule,
} from "devextreme-vue/data-grid";
import {
  DxTreeList,
  DxColumn,
  DxFilterRow,
  DxHeaderFilter,
  DxRequiredRule,
  DxAsyncRule,
  DxPatternRule,
  DxExport,
  DxEditing,
  // DxGroupPanel,
  // DxColumnChooser,
  // DxHeaderFilter,
  DxSearchPanel,
  // DxSelection,
  DxLookup,
} from "devextreme-vue/tree-list";

export default {
  components: {
    textArea,
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
          : [],
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
          : [],
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
          : [],
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
          : [],
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
