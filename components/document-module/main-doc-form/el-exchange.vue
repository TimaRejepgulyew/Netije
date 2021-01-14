<template>
  <main class="pt-2">
    <DxButton
      :hint="$t('buttons.refresh')"
      class="refresh-btn"
      icon="refresh"
      :onClick="refresh"
    ></DxButton>
    <DxDataGrid
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :read-only="true"
    >
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        sort-order="desc"
        data-field="lastUpdate"
        data-type="datetime"
        :caption="$t('exchange.lastUpdate')"
      ></DxColumn>
      <DxColumn
        data-field="author.name"
        :caption="$t('exchange.author')"
      ></DxColumn>
      <DxColumn data-field="exchangeState" :caption="$t('exchange.author')">
        <DxLookup
          valueExpr="id"
          displayExpr="name"
          :data-source="exchangeStateSource"
      /></DxColumn>

      <DxColumn
        data-field="counterparty.name"
        :caption="$t('exchange.counterparty')"
      >
      </DxColumn>
      <DxColumn data-field="note" :caption="$t('exchange.note')"></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import ExchangeState from "~/components/integration-exchage/infrastructure/models/ExchangeState.js";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxScrolling,
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxLookup,
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxLookup,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxHeaderFilter,
    DxScrolling,
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton,
  },
  props: ["documentId"],
  data() {
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.ExchangeLogs}${this.documentId}`,
        }),
        paginate: true,
        pageSize: 10,
      }),
      exchangeStateSource: Object.values(new ExchangeState(this).getAll()),
    };
  },
  methods: {
    refresh() {
      this.dataSource.reload();
    },
  },
};
</script>
<style scoped>
.pt-2 {
  padding-top: 20px;
}
</style>
