<template>
  <main>
    <Header :headerTitle="$t('translations.menu.companyDirectives')"></Header>
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
        :file-name="$t('translations.menu.companyDirectives')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="companyDirective" />

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
        data-field="assigneeId"
        :caption="$t('translations.fields.assigneeId')"
        data-type="selectbox"
      >
        <DxLookup :data-source="employeeStores" value-expr="id" display-expr="name" />
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
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
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
  DxFilterBuilderPopup,
  DxFilterPanel,
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
    DxFilterBuilderPopup,
    DxFilterPanel,
    DxStateStoring
  },
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.CompanyDirective,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "BaseOrder",
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
      businessUnitStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
      }),
      departmentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),
      documentKindStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind
      })
    };
  }
};
</script>

