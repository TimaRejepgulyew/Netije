<template>
  <main class="container container--grid">
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
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      :onRowDblClick="toMoreAbout"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
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
        :file-name="$t('translations.menu.incommingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="allDocument" />

      <DxEditing
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="false"
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
      <DxColumn data-field="caseFileId" :caption="$t('translations.fields.caseFileId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="caseFileStores"
          value-expr="id"
          display-expr="title"
        />
      </DxColumn>
      <DxColumn data-field :caption="$t('translations.fields.caseFileId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="caseFileStores"
          value-expr="id"
          display-expr="title"
        />
      </DxColumn>
      <DxColumn
        data-field="created"
        :caption="$t('translations.fields.createdDate')"
        data-type="date"
      />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')"></DxColumn>

      <DxColumn :visible="true" data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
      <DxColumn
        :visible="true"
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
        :visible="true"
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
    </DxDataGrid>
  </main>
</template>
<script>
import CreateDocument from "~/components/paper-work/createDocumentPopup";
import { DxPopup } from "devextreme-vue/popup";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import { DxLoadPanel } from "devextreme-vue/load-panel";
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
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
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
    DxStateStoring
  },
  data() {
    return {
      createDocumentPopup: false,
      filterBuilderPopupPosition: {
        of: window,
        at: "top",
        my: "top",
        offset: { y: 10 }
      },
      headerTitle: this.$t("translations.menu.allDocument"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.AllDocument,
        removeUrl: dataApi.paperWork.DeleteDocument
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
      ],
      entityType: "OfficialDocument",
      statusStores: this.$store.getters["status/status"],

      toMoreAbout: e => {
        const address = this.urlByTypeGuid[e.data.documentTypeGuid] + e.key;
        this.$router.push(address);
      },
      onToolbarPreparing(e) {
        if (e.toolbarOptions.items[1].options) {
          e.toolbarOptions.items[1].options.onClick = () => {
            this.createDocumentPopup = true;
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
  computed: {
    urlByTypeGuid() {
      return this.$store.getters["paper-work/urlByTypeGuid"];
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
