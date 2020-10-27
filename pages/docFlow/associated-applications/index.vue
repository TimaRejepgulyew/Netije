<template>
  <main>
    <Header :headerTitle="$t('menu.associatedApp')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :errorRowEnabled="false"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.registrationGroup')"
      />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="RegistrationGroup"
      />

      <DxEditing
        :allow-updating="
          $store.getters['permissions/allowUpdating'](entityType)
        "
        :allow-deleting="
          $store.getters['permissions/allowDeleting'](entityType)
        "
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('shared.name')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('shared.nameRequired')" />
      </DxColumn>

      <DxColumn
        data-field="extension"
        data-type="string"
        :caption="$t('docFlow.fields.extension')"
        :editor-options="extensionOptions"
      >
        <DxRequiredRule :message="$t('docFlow.validation.extensionRequired')" />
        <DxPatternRule
          :pattern="extensionsPattern"
          :message="$t('docFlow.validation.extensionPatternRule')"
        />
        <DxAsyncRule
          :reevaluate="false"
          :message="$t('docFlow.validation.extensionAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn data-field="filesTypeId" :caption="$t('docFlow.fields.filesType')">
        <DxRequiredRule :message="$t('docFlow.validation.filesTypeRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="filesTypeStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
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
  DxGroupPanel,
  DxGrouping,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxPatternRule,
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
    DxGrouping,
    DxGroupPanel,
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPatternRule,
  },
  data() {
    return {
      extensionsPattern: /^\.[^\s]\w+$/,
      extensionOptions: {
        mask: ".cccccccccc",
        useMaskedValue: true,
      },
      entityType: EntityType.AssociatedApplications,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.AssociatedApplication,
        insertUrl: dataApi.docFlow.AssociatedApplication,
        updateUrl: dataApi.docFlow.AssociatedApplication,
        removeUrl: dataApi.docFlow.AssociatedApplication,
      }),
      statusDataSource: this.$store.getters["status/status"](this),
      filesTypeStores: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.FilesType,
        }),
        paginate: true,
      },
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.AssociatedApplicationDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value,
        },
        dataField
      );
    },
  },
};
</script>