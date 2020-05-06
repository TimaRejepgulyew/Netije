<template>
  <main>
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif'),showPane:false}"
      :onRowDblClick="toMoreAbout"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.simpleDocument')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="simpleDocument" />

      <DxEditing
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="popup"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>
      <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
      <DxColumn
        data-field="businessUnitId"
        :caption="$t('translations.fields.businessUnitId')"
        data-type="selectbox"
      >
        <DxLookup :data-source="businessUnitStores" value-expr="id" display-expr="name" />
      </DxColumn>
      <DxColumn
        data-field="departmentId"
        :caption="$t('translations.fields.departmentId')"
        data-type="selectbox"
      >
        <DxLookup :data-source="departmentStores" value-expr="id" display-expr="name" />
      </DxColumn>
      <DxColumn
        data-field="documentKindId"
        :caption="$t('translations.fields.documentKindId')"
        data-type="selectbox"
      >
        <DxLookup :data-source="documentKindStores" value-expr="id" display-expr="name" />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
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
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
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
      headerTitle: this.$t("translations.menu.simpleDocument"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.SimpleDocument,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "SimpleDocument",
      statusDataSource: this.$store.getters["status/status"],

      toMoreAbout: e => {
        this.$store.getters["globalProperties/toForm"](this, e.key);
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
      businessUnitStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
      }),
      departmentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
      documentKindStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind
      })
    };
  }
};
</script>
