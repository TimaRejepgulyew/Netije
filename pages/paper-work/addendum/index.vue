<template>
  <main>
    <Header :headerTitle="$t('menu.addendum')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
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
        data-field="extension"
        :allow-filtering="false"
        :width="60"
        :caption="$t('translations.fields.extension')"
        cell-template="cellTemplate"
        :visible="true"
      ></DxColumn>

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
      <DxColumn data-field="extension" type="buttons">
        <DxButton
          :on-click="previewDocument"
          :visible="canBeOpenWithPreview"
          icon="search"
          :text="$t('translations.fields.preview')"
        ></DxButton>
        <DxButton icon="download" :on-click="downloadDocument" :visible="hasVersion"></DxButton>
        <DxButton icon="trash" name="delete"></DxButton>
      </DxColumn>
      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value?cell.data.value:null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import documentIcon from "~/components/page/document-icon";
import DocumentService from "~/infrastructure/services/documentService";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
import {
  DxButton,
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
  DxFilterBuilderPopup,
  DxFilterPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxButton,
    documentIcon,
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
  },
  methods: {
    canBeOpenWithPreview(e) {
      if (e.row.data.associatedApplication) {
        return e.row.data.canBeOpenedWithPreview;
      } else {
        false;
      }
    },
    hasVersion(e) {
      return e.row.data.hasVersions;
    },
    downloadDocument(e) {
      DocumentService.downloadDocument(
        {
          ...e.row.data,
          extension: e.row.data.extension
        },
        this
      );
    },
    previewDocument(e) {
      DocumentService.previewDocument(e.row.data, this);
    }
  },
  methods: {
    canBeOpenWithPreview(e) {
      if (e.row.data.associatedApplication) {
        return e.row.data.canBeOpenedWithPreview;
      } else {
        false;
      }
    },
    hasVersion(e) {
      return e.row.data.hasVersions;
    },
    downloadDocument(e) {
      DocumentService.downloadDocument(
        {
          ...e.row.data,
          extension: e.row.data.extension
        },
        this
      );
    },
    previewDocument(e) {
      DocumentService.previewDocument(e.row.data, this);
    }
  }
};
</script>

