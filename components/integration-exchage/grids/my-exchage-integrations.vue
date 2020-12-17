<template>
  <main>
    <Header
      :showTitle="!isCard"
      :headerTitle="$t('exchange.headers.myExchangeIntegration')"
      :isbackButton="!isCard"
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
      :onRowDblClick="selected"
      @toolbar-preparing="onToolbarPreparing($event)"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
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
        :file-name="$t('exchange.headers.myExchangeIntegration')"
      />

      <DxStateStoring
        :enabled="false"
        type="localStorage"
        storage-key="myExchangeIntegration"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        data-field="name"
        :caption="$t('exchange.fields.name')"
        data-type="string"
      ></DxColumn>
      <DxColumn
        data-field="organizationId"
        :caption="$t('exchange.fields.organizationId')"
      />
      <DxColumn
        data-field="routing"
        :caption="$t('exchange.fields.routing')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="routingDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="businessUnitId"
        :caption="$t('exchange.fields.businessUnitId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="businessUnitStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('exchange.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxColumn
        data-field="note"
        :caption="$t('exchange.fields.note')"
        :visible="false"
      ></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import RoutingTypeGuid from "../infrastructure/constants/routing.js";
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
  DxStateStoring,
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
    DxStateStoring,
  },
  props: ["isCard"],
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.Boxes,
      }),
      statusDataSource: this.$store.getters["status/status"](this),
      businessUnitStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.businessUnit,
        }),
        paginate: true,
        pageSize: 10,
      }),
      routingDataSource: [
        {
          name: this.$t("exchange.routingType.BoxResponsible"),
          id: RoutingTypeGuid.BoxResponsible,
        },
      ],
    };
  },
  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.dataSource.reload();
          },
        },
      });
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "plus",
          onClick: () => {
            this.$emit("create");
          },
        },
      });
    },
    selected(e) {
      this.$emit("selected", e.data);
    },
  },
};
</script>

