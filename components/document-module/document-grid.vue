<template>
  <main>
    <Header
      :headerTitle="generateHeaderTitle"
      :showTitle="!isCard"
      :isbackButton="!isCard"
    >
      <QuickFilter
        :visible="!isCard"
        slot="toolbar"
        :defaultValue="defaultFilter"
        :dataSource="QuiсkFilterItems"
        :storeKey="'document-' + documentQuery"
        @valueChanged="setStore"
      />
    </Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :columns="columns"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="false"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
      :onRowDblClick="selectDocument"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="false"
    >
      <DxSelection />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />
      <DxFilterPanel :visible="true" />
      <DxFilterBuilderPopup :position="filterBuilderPopupPosition" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('shared.documents')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        :storage-key="'allDocument' + documentQuery"
      />
      <DxEditing :allow-adding="false" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value ? cell.data.value : null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import QuickFilter from "~/components/quick-filter/index.vue";
import DocumentQuickFilterModel from "~/infrastructure/models/quickFilter/document.js";
import DocumentQuickFilterGuid from "~/infrastructure/constants/quickFilter/documentQuiсkFilter.js";
import QuiсkFilter from "~/infrastructure/constants/quickFilter/documentQuiсkFilter.js";
import routeGenerator from "~/infrastructure/routing/routeGenerator.js";
import ColumnFactory from "~/infrastructure/factory/documentGridColumnsFactory.js";
import { generateNameByDocQuery } from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import documentIcon from "~/components/page/document-icon";
import DocumentService from "~/infrastructure/services/documentVersionService";
import {
  DxSearchPanel,
  DxFilterPanel,
  DxFilterBuilderPopup,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxExport,
  DxSelection,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
} from "devextreme-vue/data-grid";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import DataSource from "devextreme/data/data_source";
import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
export default {
  components: {
    documentIcon,
    DxLoadPanel,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxSelection,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    Header,
    QuickFilter,
  },
  props: {
    documentQuery: {
      type: Number,
      default: DocumentQuery.All,
    },
    isCard: {
      type: Boolean,
    },
    documentFilter: {},
  },

  data() {
    return {
      activeFilter: QuiсkFilter.All,
      store: null,
      filterBuilderPopupPosition: this.$store.getters[
        "paper-work/filterBuilderPopupPosition"
      ],
      selectDocument: (e) => {
        this.$emit("selectedDocument", {
          id: e.key,
          documentTypeGuid: e.data.documentTypeGuid,
        });
      },
      defaultFilter: DocumentQuickFilterGuid.All,
    };
  },
  methods: {
    setStore(filter) {
      this.store = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Documents}${this.documentQuery}/${filter}`,
        }),
      });
    },
    itemClick(e) {
      this.activeFilter = e.itemIndex;
      this.setStore(this.activeFilter);
    },

    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.store.reload();
          },
        },
      });
    },
  },
  computed: {
    QuiсkFilterItems() {
      return Object.values(new DocumentQuickFilterModel(this).getAll()).map(
        (item) => {
          item.hint = item.text;
          return item;
        }
      );
    },

    generateHeaderTitle() {
      return generateNameByDocQuery(this.documentQuery, this);
    },
    columns() {
      return ColumnFactory.CreateColumns(this.documentQuery, this);
    },
    urlByTypeGuid() {
      return this.$store.getters["paper-work/urlByTypeGuid"];
    },
  },
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}

.dx-datagrid
  .dx-datagrid-content
  .dx-datagrid-table
  .dx-row
  .dx-command-edit-with-icons
  .dx-link {
  width: 18px;
  height: 18px;
  background-position: 0 0;
  background-size: 18px 18px;
  padding: 0;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
}
</style>
