<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.registrationGroup')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="RegistrationGroup"
      />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.name')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="extension"
        data-type="string"
        :caption="$t('translations.fields.extension')"
        :editor-options="extensionOptions"
      >
        <DxRequiredRule
          :message="$t('translations.fields.extensionRequired')"
        />
        <DxPatternRule
          :pattern="extensionsPattern"
          :message="$t('translations.fields.extensionPatternRule')"
        />
        <DxAsyncRule
          :message="$t('translations.fields.extensionAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :data-source="statusStores"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>

      <DxColumn
        data-field="filesTypeId"
        :caption="$t('translations.fields.filesTypeId')"
      >
        <DxRequiredRule
          :message="$t('translations.fields.filesTypeIdRequired')"
        />
        <DxLookup
          :data-source="filesTypeStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import EmployeeTagBoxComponent from "~/components/docFlow/registration-group/index__tag-box-component";
import dataApi from "~/static/dataApi";
import CustomStore from "devextreme/data/custom_store";
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxTagBox,
  DxPatternRule
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";

export default {
  components: {
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPatternRule
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.associatedApp"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.AssociatedApplication,
        insertUrl: dataApi.docFlow.AssociatedApplication,
        updateUrl: dataApi.docFlow.AssociatedApplication,
        removeUrl: dataApi.docFlow.AssociatedApplication
      }),

      statusStores: this.$store.getters["status/status"],
      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      filesTypeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.FilesType
      }),

      extensionsPattern: /^\.[^\s]\w+$/,

      extensionOptions: {
        mask: ".cccccccccc",
        useMaskedValue: true
      }
    };
  },
  methods:{
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.AssociatedApplicationDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    },
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: block;
}
</style>
