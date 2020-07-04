<template>
  <main>
    <DxPopup
      :visible.sync="createDocumentPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      height="auto"
      :title="$t('translations.fields.createDocument')"
    >
      <div>
        <CreateDocument></CreateDocument>
      </div>
    </DxPopup>
    <Header :headerTitle="generateHeaderTitle" :isbackButton="!isCard" :isNew="isNew"></Header>
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
        :storage-key="'allDocument'+documentTypeGuid"
      />
      <DxEditing :allow-adding="true" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value?cell.data.value:null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import routeGenerator from "~/infrastructure/routing/routeGenerator.js";
import ColumnFactory from "~/infrastructure/factory/documentGridColumnsFactory.js";
import CreateDocument from "~/components/paper-work/createDocumentPopup";
import { DxPopup } from "devextreme-vue/popup";
import { generateNameByDocFilter } from "~/infrastructure/constants/documentFilterType.js";
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
    CreateDocument,
    DxPopup,
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
    Header
  },
  props: ["documentTypeGuid", "isCard"],
  data() {
    return {
      createDocumentPopup: false,
      createDocumentPopup: false,
      filterBuilderPopupPosition: this.$store.getters[
        "papaer-work/filterBuilderPopupPosition"
      ],
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.Documents + this.documentTypeGuid
        }),
        paginate: true
      }),
      selectDocument: e => {
        this.$emit("selectedDocument", {
          id: e.key,
          documentTypeGuid: e.data.documentTypeGuid
        });
      }
    };
  },
  methods: {
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });

      if (addButton) {
        addButton.options.onClick = () => {
          this.createDocumentPopup = true;
        };
      }
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
      return generateNameByDocFilter(this.documentTypeGuid, this);
    },
    columns() {
      return ColumnFactory.CreateColumns(this.documentTypeGuid, this);
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