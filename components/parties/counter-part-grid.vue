<template>
  <main>
    <Header
      
      :headerTitle="$t('menu.counterPart')"
      :isbackButton="false"
      :isNew="false"
    ></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :selection="{ mode: 'single' }"
      :hover-state-enabled="true"
      :onRowDblClick="selectDocument"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
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
        :file-name="$t('menu.counterPartList')"
      />

      <DxStateStoring :enabled="false" type="localStorage" storage-key="CounterParts" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="type"
        :allow-filtering="false"
        :width="60"
        :caption="$t('translations.fields.type')"
        cell-template="cellTemplate"
        :visible="true"
      ></DxColumn>

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>
      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')" :visible="false"></DxColumn>
      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')" :visible="true"></DxColumn>
      <DxColumn data-field="email" :caption="$t('translations.fields.email')" :visible="true"></DxColumn>
      <DxColumn data-field="code" :caption="$t('translations.fields.code')" :visible="false" />
      <DxColumn data-field="regionId" :caption="$t('translations.fields.regionId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="regionsDataSource"
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
          :data-source="localityDataSource"
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
      <DxColumn data-field="webSite" :caption="$t('translations.fields.webSite')" :visible="false"></DxColumn>
      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false"></DxColumn>

      <DxColumn
        data-field="nonresident"
        :visible="false"
        data-type="boolean"
        :caption="$t('translations.fields.nonresident')"
      ></DxColumn>

      <DxColumn data-field="account" :caption="$t('translations.fields.account')" :visible="false"></DxColumn>

      <DxColumn data-field="bankId" :caption="$t('translations.fields.bankId')" :visible="false">
        <DxLookup
          :allow-clearing="true"
          :data-source="banksDataSource"
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
      <template #cellTemplate="cell">
        <img class="icon--type" :src="cell.data.value|typeIcon" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import CounterpartyType from "~/infrastructure/constants/counterpartyTypes";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
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
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
      }),
      statusDataSource: this.$store.getters["status/status"](this),
      regionsDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Region
        }),
        paginate: true
      },
      localityDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Locality
        }),
        paginate: true
      },
      banksDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.Bank
        }),
        paginate: true
      }
    };
  },
  methods: {

    selectDocument(e) {
      this.$emit("valueChanged", e.data);
    }
  },
  filters: {
    typeIcon(value) {
      switch (value) {
        case CounterpartyType.Bank:
          return require("~/static/icons/bank.svg");
          break;
        case CounterpartyType.Company:
          return require("~/static/icons/company.svg");
          break;
        case CounterpartyType.Person:
          return require("~/static/icons/user-panel--icon.png");
          break;
        default:
          throw "Unknown counterparty";
      }
    }
  }
};
</script>
<style lang="scss">
.icon--type {
  width: 30px;
}
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}
</style>