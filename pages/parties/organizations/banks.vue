<template>
  <main>
    <Header :headerTitle="$t('translations.menu.banks')"></Header>
    <DxDataGrid
      id="gridContainer"      :show-borders="true"
      :data-source="store"
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
        :file-name="$t('translations.fields.bankId')"
      />
      <DxStateStoring :enabled="true" type="localStorage" storage-key="Bank" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
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
      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')">
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('translations.fields.tinRule')"
        />
        <DxAsyncRule
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
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveRegions"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')"></DxColumn>
      <DxColumn
        data-field="legalName"
        :caption="$t('translations.fields.legalName')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="bic" :caption="$t('translations.fields.bic')" :visible="false">
        <DxAsyncRule
          :message="$t('translations.fields.bicAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

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
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="postAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="webSite" :caption="$t('translations.fields.webSite')"></DxColumn>

      <DxColumn
        data-field="nonresident"
        :caption="$t('translations.fields.nonresident')"
        :visible="false"
        data-type="boolean"
      ></DxColumn>

      <DxColumn data-field="account" :caption="$t('translations.fields.account')" :visible="false"></DxColumn>

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

      <template #masterDetailTemplate="company" v-if="hasContactAccess">
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
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import ContactMasterDetail from "~/components/parties/organizations/contact__masterDetail";
import textArea from "~/components/page/textArea";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxGrouping,
  DxGroupPanel,
  DxLookup,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxMasterDetail,
  DxPatternRule
} from "devextreme-vue/data-grid";

export default {
  components: {
    ContactMasterDetail,
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
    DxAsyncRule,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPatternRule,
    DxMasterDetail
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Bank,
        insertUrl: dataApi.contragents.Bank,
        updateUrl: dataApi.contragents.Bank,
        removeUrl: dataApi.contragents.Bank
      }),
      entityType: EntityType.Counterparty,
      hasContactAccess: this.$store.getters['permissions/allowReading'](EntityType.Contact),
      statusDataSource: this.$store.getters["status/status"](this),
      onRegionIdChanged(rowData, value) {
        rowData.localityId = null;
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
    getActiveRegions(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Region
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.regionId]
          : []
      };
    },
    getActiveLocalities(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Locality
        }),
        paginate: true,
        filter: options.data
          ? [ "regionId", "=", options.data.regionId, "or", "status", "=", Status.Active, "or", "id", "=", options.data.localityId]
          : []
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.BankDataFieldValueNotExists(
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

