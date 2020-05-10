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
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      :onRowDblClick="openDocument"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="true"
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
        :file-name="$t('menu.incommingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="allDocument" />
      <DxEditing :allow-adding="true" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        :fixed="true"
        data-field="associatedApplication"
        :allow-filtering="false"
        :allow-sorting="false"
        :allow-resizing="false"
        :allow-reordering="false"
        :allow-hiding="false"
        :allow-grouping="false"
        :allow-fixing="false"
        :allow-exporting="false"
        :allow-search="false"
        :width="60"
        :caption="''"
        cell-template="cellTemplate"
        :visible="true"
      ></DxColumn>
      <DxColumn data-field="name" :width="1000" :caption="$t('document.fields.name')"></DxColumn>
      <DxColumn
        data-field="created"
        format="dd.MM.yyyy hh:mm"
        data-type="date"
        :caption="$t('document.fields.created')"
      ></DxColumn>
      <DxColumn
        data-field="modified"
        format="dd.MM.yyyy hh:mm"
        data-type="date"
        :caption="$t('document.fields.modified')"
      ></DxColumn>
      <DxColumn :visible="false" data-field="authorId" :caption="$t('document.fields.authorId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn type="buttons">
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
        <document-icon :extension="cell.data.value?cell.data.value.extension:null" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import CreateDocument from "~/components/paper-work/createDocumentPopup";
import { DxPopup } from "devextreme-vue/popup";
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
    CreateDocument,
    DxPopup,
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
  data() {
    return {
      createDocumentPopup: false,
      filterBuilderPopupPosition: this.$store.getters[
        "papaer-work/filterBuilderPopupPosition"
      ],
      headerTitle: this.$t("menu.allDocument"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.AllDocument,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      employeeStores: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        valueExpr: "id",
        displayExpr: "name"
      },
      openDocument: e => {
        const address = this.urlByTypeGuid[e.data.documentTypeGuid] + e.key;
        this.$router.push(address);
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
    urlByTypeGuid() {
      return this.$store.getters["paper-work/urlByTypeGuid"];
    }
  },
  methods: {
    canBeOpenWithPreview(e) {
      if (e.row.data.associatedApplication) {
        return e.row.data.associatedApplication.canBeOpenedWithPreview;
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
          extension: e.row.data.associatedApplication.extension
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

