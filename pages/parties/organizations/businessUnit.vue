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
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxSelection mode="multiple" />

      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />

      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.company')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Company" />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel
        position="after"
       
        :visible="true"
      />

      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />

        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="headCompanyId"
        :caption="$t('translations.fields.headCompanyId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredHeadOfficeId"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="legalName"
        :caption="$t('translations.fields.legalName')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')" :visible="false">
        <DxAsyncRule
          :message="$t('translations.fields.tinAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="code" :caption="$t('translations.fields.code')">
        <DxPatternRule :pattern="codePattern" :message="$t('translations.fields.codeRule')" />
      </DxColumn>

      <DxColumn
        data-field="regionId"
        :caption="$t('translations.fields.regionId')"
        :set-cell-value="onRegionIdChanged"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredRegion"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="localityId" :caption="$t('translations.fields.localityId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredLocality"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="postAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')" :visible="false"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')" :visible="false">
        <DxEmailRule :message="$t('translations.fields.emailRule')" />
      </DxColumn>

      <DxColumn data-field="webSite" :caption="$t('translations.fields.webSite')"></DxColumn>

      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false"></DxColumn>

      <DxColumn
        data-field="nonresident"
        :caption="$t('translations.fields.nonresident')"
        :visible="false"
        data-type="boolean"
      ></DxColumn>

      <DxColumn data-field="account" :caption="$t('translations.fields.account')"></DxColumn>

      <DxColumn data-field="bankId" :caption="$t('translations.fields.bankId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredBank"
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
      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>
      <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

      <template #masterDetailTemplate="company">
        <ContactMasterDetail :company="company.data" />
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
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import ContactMasterDetail from "~/components/parties/organizations/contact__masterDetail";
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
import {
  DxPatternRule,
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
  DxMasterDetail,
  DxEmailRule
} from "devextreme-vue/data-grid";

export default {
  components: {
    textArea,
    DxPatternRule,
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
    DxMasterDetail,
    ContactMasterDetail,
    DxEmailRule
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.businessUnit"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Company,
        insertUrl: dataApi.contragents.Company,
        updateUrl: dataApi.contragents.Company,
        removeUrl: dataApi.contragents.Company
      }),

      statusStores: this.$store.getters["status/status"],

      region: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Region
      }),

      locality: this.$dxStore({
        key: "id",
        loadUrl: dataApi.sharedDirectory.Locality
      }),

      bank: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Bank
      }),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },

      onRegionIdChanged(rowData, value) {
        rowData.localityId = null;
        this.defaultSetCellValue(rowData, value);
      },
      codePattern: /^[^\s]+$/
    };
  },
  methods: {
    getFilteredHeadOfficeId(options) {
      return {
        store: this.store,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.headOfficeId]
          : null
      };
    },
    getFilteredRegion(options) {
      return {
        store: this.region,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.regionId]
          : null
      };
    },
    getFilteredLocality(options) {
      return {
        store: this.locality,
        filter: options.data
          ? ["regionId", "=", options.data.regionId, "or", "status", "=", 0]
          : null
      };
    },
    getFilteredBank(options) {
      return {
        store: this.bank,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.bankId]
          : null
      };
    },

    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CompanyDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
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
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
