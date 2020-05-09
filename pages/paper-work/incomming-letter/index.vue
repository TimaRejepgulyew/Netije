<template>
  <main>
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
      :onRowDblClick="toMoreAbout"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="true"
    >
    
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterPanel :visible="true" />
      <DxFilterBuilderPopup :position="filterBuilderPopupPosition" />
      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.incommingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="incommingLetter" />

      <DxEditing :allow-deleting="true" :allow-adding="true" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        data-field="associatedApplication"
        :allow-filtering="false"
        :width="60"
        :caption="$t('translations.fields.extension')"
        cell-template="cellTemplate"
        :visible="true"
      ></DxColumn>
      <DxColumn data-field="dated" :caption="$t('translations.fields.dated')" data-type="date" />
      <DxColumn
        data-field="created"
        :caption="$t('translations.fields.createdDate')"
        data-type="date"
      />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn data-field="inNumber" :caption="$t('translations.fields.regNumberDocument')"></DxColumn>
      <DxColumn
        data-field="correspondentId"
        :caption="$t('translations.fields.correspondentId')"
        data-type="selectbox"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="correspondentStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="placedToCaseFileDate"
        :caption="$t('translations.fields.placedToCaseFileDate')"
        data-type="date"
      />
      <DxColumn data-field="caseFileId" :caption="$t('translations.fields.caseFileId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="caseFileStores"
          value-expr="id"
          display-expr="title"
        />
      </DxColumn>

      <DxColumn :visible="false" data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
      <DxColumn
        :visible="false"
        data-field="businessUnitId"
        :caption="$t('translations.fields.businessUnitId')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="businessUnitStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        :visible="false"
        data-field="departmentId"
        :caption="$t('translations.fields.departmentId')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="departmentStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="registrationState"
        :caption="$t('translations.fields.registrationState')"
        data-type="selectbox"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="regStatedStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <template #cellTemplate="cell">
        <document-icon :extension="cell.data.value?cell.data.value.extension:null" />
      </template>
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
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
import Header from "~/components/page/page__header";
import documentIcon from "~/components/page/document-icon";
import DocumentService from "~/infrastructure/services/documentService";
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
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxFilterBuilderPopup,
  DxFilterPanel,
  DxStateStoring,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    documentIcon,
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
    DxFilterBuilderPopup,
    DxFilterPanel,
    DxStateStoring,
    DxButton
  },
  data() {
    return {
      headerTitle: this.$t("menu.incommingLetter"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.IncommingLetter,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "IncomingLetter",
      statusDataSource: this.$store.getters["status/status"],
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
      filterBuilderPopupPosition: this.$store.getters[
        "papaer-work/filterBuilderPopupPosition"
      ],
      correspondentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
      }),
      documentKindStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind
      }),
      businessUnitStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
      }),
      departmentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
      caseFileStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.CaseFile
      }),
      regStatedStores: [
        { id: null, name: this.$t("translations.fields.notRegistered") },
        { id: 0, name: this.$t("translations.fields.registered") },
        { id: 1, name: this.$t("translations.fields.notRegistered") }
      ]
    };
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

