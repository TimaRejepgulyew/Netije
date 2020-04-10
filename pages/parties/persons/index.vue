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
        :file-name="$t('translations.fields.person')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Person" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        data-field="firstName"
        :caption="$t('translations.fields.firstName')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.firstNameRequired')" />
      </DxColumn>
      <DxColumn
        data-field="lastName"
        :caption="$t('translations.fields.lastName')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.lastNameRequired')" />
      </DxColumn>
      <DxColumn
        data-field="middleName"
        :caption="$t('translations.fields.middleName')"
        data-type="string"
      ></DxColumn>

      <DxColumn
        data-field="dateOfBirth"
        :caption="$t('translations.fields.dateOfBirth')"
        data-type="date"
      ></DxColumn>

      <DxColumn data-field="sex" :caption="$t('translations.fields.sex')" data-type="string">
        <DxLookup :allow-clearing="true" :data-source="sex" value-expr="id" display-expr="name"></DxLookup>
      </DxColumn>

      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')" :visible="false">
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

      <DxColumn data-field="code" :caption="$t('translations.fields.code')">
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('translations.fields.codeRule')"
        />
        <DxAsyncRule
          :ignore-empty-value="true"
          :message="$t('translations.fields.codeAlreadyExists')"
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

      <DxColumn
        data-field="nonresident"
        :visible="false"
        data-type="boolean"
        :caption="$t('translations.fields.nonresident')"
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
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
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
  DxEmailRule,
  DxPatternRule
} from "devextreme-vue/data-grid";

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
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxEmailRule,
    DxPatternRule
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.person"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Person,
        insertUrl: dataApi.contragents.Person,
        updateUrl: dataApi.contragents.Person,
        removeUrl: dataApi.contragents.Person
      }),
      entityType: "Counterparty",
      statusStores: this.$store.getters["status/status"],

      sex: [
        { id: 0, name: "Мужской" },
        { id: 1, name: "Женский" }
      ],

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
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
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
      return this.$customValidator.PersonDataFieldValueNotExists(
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
.container {
  display: block;
}
</style>
