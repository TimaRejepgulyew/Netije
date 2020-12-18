<template>
  <main>
    <Header
      :showTitle="!isCard"
      :headerTitle="$t('exchange.headers.myExchangeIntegrations')"
      :isbackButton="!isCard"
      :isNew="false"
    ></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :selection="{ mode: 'single' }"
      :hover-state-enabled="true"
      @toolbar-preparing="onToolbarPreparing($event)"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
    >
      <DxEditing
        :allow-updating="false"
        :allow-deleting="true"
        :allow-adding="false"
        :useIcons="true"
        mode="row"
      ></DxEditing>
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
        data-field="routing"
        :caption="$t('exchange.fields.routing')"
        :visible="true"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="routingDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        dataType="object"
        data-field="responsible.name"
        :caption="$t('exchange.fields.responsible')"
        :visible="true"
      >
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('exchange.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="key"
          :onClick="uploadKey"
          :text="$t('buttons.uploadKey')"
        />
        <DxButton name="delete" />
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
import { download } from "~/infrastructure/services/documentVersionService.js";
import Status from "~/infrastructure/constants/status";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
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
  DxButton,
  DxEditing,
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
    DxButton,
    DxEditing,
  },
  props: ["isCard"],
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.boxes.Boxes,
        removeUrl: dataApi.boxes.Boxes,
      }),
      statusDataSource: this.$store.getters["status/status"](this),
      responsibleStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
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
    uploadKey(e) {
      console.log(e);
      this.$awn.asyncBlock(
        this.$axios.get(`${dataApi.boxes.PublickKey}${e.row.key}`, {
          responseType: "blob",
        }),
        ({ data }) => {
          const blob = new Blob(
            [data],
            {
              type: `data:${data.type}`,
            },
            (e) => {
              console.error(e.data);
            }
          );
          saveAs(blob, `"public.txt`);
        }
      );
    },
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

