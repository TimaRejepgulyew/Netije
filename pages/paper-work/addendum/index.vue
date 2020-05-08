<template>
  <main>
    <Header :headerTitle="$t('menu.addendum')"></Header>
    <DxDataGrid
      id="gridContainer"      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      :onRowDblClick="toMoreAbout"
     @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="true"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxFilterPanel :visible="true" />
      <DxFilterBuilderPopup :position="filterBuilderPopupPosition" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.incommingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="incommingLetter" />

      <DxEditing
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="popup"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="placedToCaseFileDate"
        :caption="$t('translations.fields.placedToCaseFileDate')"
        data-type="date"
      />

      <DxColumn
        data-field="created"
        :caption="$t('translations.fields.createdDate')"
        data-type="date"
      />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')"></DxColumn>

      <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>

      <DxColumn
        data-field="leadingDocumentId"
        :caption="$t('translations.fields.leadingDocumentId')"
        data-type="selectbox"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="leadingDocumentStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="documentKindId"
        :caption="$t('translations.fields.documentKindId')"
        data-type="selectbox"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="documentKindStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
import {
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
  DxFilterBuilderPopup,
  DxFilterPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxLoadPanel,
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
    DxFilterBuilderPopup,
    DxFilterPanel,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.Addendum,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "Addendum",
      statusDataSource: this.$store.getters["status/status"],
      filterBuilderPopupPosition: this.$store.getters[
        "papaer-work/filterBuilderPopupPosition"
      ],
      toMoreAbout: e => {
        this.$router.push(
          RouteGenerator.generateDocumentDetailRoute(this, e.key)
        );
      },
      onToolbarPreparing(e) {
        const addButton = e.toolbarOptions.items.find(btn => {
          return btn.name == "addRowButton";
        });
        if (addButton) {
          addButton.options.onClick = () => {
            this.$store.getters["globalProperties/toForm"](this);
          };
        }
      },
      leadingDocumentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.AllDocument
      }),
      documentKindStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind
      })
    };
  }
};
</script>

