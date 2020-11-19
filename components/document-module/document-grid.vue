<template>
  <main>
    <Header :headerTitle="generateHeaderTitle" :isbackButton="!isCard">
      <DxButtonGroup
        :visible="!isCard"
        slot="toolbar"
        :selected-item-keys="[activeFilter]"
        :items="QuiсkFilterOptions"
        key-expr="filterKey"
        styling-mode="text"
        @item-click="itemClick"
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
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="selectDocument"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="false"
    >
      <DxGrouping :auto-expand-all="false" />
      <DxSelection />
      <DxHeaderFilter :visible="true" />

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
import { DxButtonGroup } from "devextreme-vue";
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
  DxButton
} from "devextreme-vue/data-grid";
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
    DxButton,
    Header,
    DxButtonGroup
  },
  props: ["documentQuery", "isCard", "documentFilter"],
  created() {
    console.log(this.documentQuery);
  },
  data() {
    return {
      activeFilter: QuiсkFilter.All,
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Documents}${this.documentQuery}`
        }),
        filter: this.documentFilter,
        paginate: true,
        pageSize: 10
      }),
      QuiсkFilterOptions: [
        {
          text: this.$t("buttons.all"),
          filterKey: QuiсkFilter.All,
          hint: this.$t("buttons.all")
        },
        {
          text: this.$t("buttons.new"),
          filterKey: QuiсkFilter.New,
          hint: this.$t("buttons.new")
        },

        {
          text: this.$t("buttons.obsolete"),
          filterKey: QuiсkFilter.Obsolete,
          hint: this.$t("buttons.obsolete")
        }
      ],
      filterBuilderPopupPosition: this.$store.getters[
        "paper-work/filterBuilderPopupPosition"
      ],
      selectDocument: e => {
        this.$emit("selectedDocument", {
          id: e.key,
          documentTypeGuid: e.data.documentTypeGuid
        });
      }
    };
  },
  methods: {
    itemClick(e) {
      this.activeFilter = e.itemIndex;
      this.setStore(this.activeFilter);
    },
    setStore(filter) {
      this.store = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Documents}${this.documentQuery}?quickFilter=${filter}&`
        }),
        paginate: true
      });
    },

    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.store.reload();
          }
        }
      });
    }
  },
  computed: {
    generateHeaderTitle() {
      return generateNameByDocQuery(this.documentQuery, this);
    },
    columns() {
      return ColumnFactory.CreateColumns(this.documentQuery, this);
    },
    urlByTypeGuid() {
      return this.$store.getters["paper-work/urlByTypeGuid"];
    }
  }
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
</style>
