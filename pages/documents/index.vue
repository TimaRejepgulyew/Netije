<template>
  <main>
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="store"
      :columns="columns"
      :remote-operations="{filtering:true,groupPaging:false,grouping:false,paging:true,sorting:true,summary:true}"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :onRowDblClick="openDocument"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="true"
    >
      <DxSelection />
      <DxHeaderFilter :allowSearch="true" :visible="false" />
    
      <DxColumnChooser :allowSearch="false" :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />
      <DxFilterPanel :visible="true" />
      <DxFilterBuilderPopup :position="filterBuilderPopupPosition" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('shared.documents')"
      />

      <!-- <DxStateStoring :enabled="true" type="localStorage" :storage-key="'Document'+type" /> -->

      <DxEditing :allow-adding="true" :allowDeleting="false" :allowUpdating="false" mode="popup"/>
      <DxSearchPanel :searchVisibleColumnsOnly="true" :visible="true" />
      <DxScrolling mode="virtual" />
      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value?cell.data.value.extension:null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import DocumentFilterType from "~/infrastructure/constants/documentFilterType";
import ColumnFactory from "~/infrastructure/factory/documentGridColumnsFactory";
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
export default {
  components: {
    documentIcon,
    DxLoadPanel,
    DxFilterPanel,
    DxFilterBuilderPopup,
    Header,
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
    DxButton
  },
  asyncData({ context, query }) {
    return {
      type: +query.type || DocumentFilterType.All
    };
  },
  data() {
    return {
      filterBuilderPopupPosition: {
        at: "top",
        my: "top",
        offset: { y: 10 }
      },
      onToolbarPreparing(e) {
        const addButton = e.toolbarOptions.items.find(btn => {
          return btn.name == "addRowButton";
        });
        if (addButton) {
          addButton.options.onClick = () => {
            this.createDocumentPopup = true;
          };
        }
      }
    };
  },
  computed: {
    columns() {
      return ColumnFactory.CreateColumns(this.type, this);
    },
    store() {
      return this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.Documents + this.type,
        removeUrl: dataApi.paperWork.DeleteDocument
      });
    },
    headerTitle() {
      return this.$t("menu.allDocument");
    }
  },
  methods:{
     openDocument(e){
        const documentRoute = this.$store.getters["paper-work/urlByTypeGuid"][e.data.documentTypeGuid] + e.key;
        this.$router.push(documentRoute);
      },
  }
};
</script>

