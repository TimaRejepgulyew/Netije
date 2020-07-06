<template>
  <main>
    <Header :headerTitle="generateHeaderTitle" :isbackButton="!isCard">
      <DxButtonGroup
        slot="toolbar"
        :items="quikFilterOptions"
        :selected-item-keys="[activeQuikFilter]"
        key-expr="filterKey"
        styling-mode="text"
        @item-click="selectActiveQuikFilter"
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
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
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
        :storage-key="'allDocument'+documentQuery"
      />
      <DxEditing :allow-adding="false" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value?cell.data.value:null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import { DxButtonGroup } from "devextreme-vue";
import QuikFilter from "~/infrastructure/constants/documentQuikFilter.js";
import routeGenerator from "~/infrastructure/routing/routeGenerator.js";
import ColumnFactory from "~/infrastructure/factory/documentGridColumnsFactory.js";
import { generateNameByDocQuery } from "~/infrastructure/constants/documentQuery.js";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import documentIcon from "~/components/page/document-icon";
import DocumentService from "~/infrastructure/services/documentService";
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
  props: ["documentQuery", "isCard"],
  data() {
    return {
      activeQuikFilter: QuikFilter.All,
      quikFilterOptions: [
        {
          text: "Все",
          filterKey: QuikFilter.All,
          hint: "Align left"
        },
        {
          text: "Новые",
          filterKey: QuikFilter.New,
          hint: "Новые"
        },

        {
          text: "Архив",
          filterKey: QuikFilter.Obsolete,
          hint: "Архив"
        }
      ],
      filterBuilderPopupPosition: this.$store.getters[
        "papaer-work/filterBuilderPopupPosition"
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
    selectActiveQuikFilter(e) {
      this.activeQuikFilter = e.itemIndex;
      this.store.reload();
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
    store() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.paperWork.Documents}${this.documentQuery}?quikFilter=${this.activeQuikFilter}`
        }),
        paginate: true
      });
    },
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