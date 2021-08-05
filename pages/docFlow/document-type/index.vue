<template>
  <main>
    <Header :headerTitle="$t('menu.documentType')"></Header>
    <DxDataGrid
      width="inherit"
      id="gridContainer"
      ref="gridContainer"
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="edit"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.documentKind')"
      />

      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="documentKind" />

      <DxEditing
        :allow-deleting="
          $store.getters['permissions/allowDeleting'](entityType)
        "
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        mode="form"
        :useIcons="true"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('shared.name')" alignment="left" data-type="string"></DxColumn>
      <DxColumn data-field="documentFlow" :caption="$t('docFlow.fields.documentFlow')">
        <DxLookup
          :allow-clearing="true"
          :data-source="documentFlow"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn type="buttons">
        <DxButton icon="more" :text="$t('shared.more')" :onClick="documentKindDetailForm"></DxButton>
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
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
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxStateStoring,
  DxFilterRow,
  DxButton
} from "devextreme-vue/data-grid";

import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
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
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxFilterRow,
    DxButton
  },
  data() {
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.dynamicDocument.documentType,
          removeUrl: dataApi.dynamicDocument.documentType
        }),
        paginate: true,
        pageSize: 10,
        filter: ["documentTypeGuid", "=", DocumentQuery.DynamicDocument]
      }),
      entityType: EntityType.DocumentKind,
      statusDataSource: this.$store.getters["status/status"](this),
      documentFlow: this.$store.getters["docflow/docflow"](this),
      numberingType: this.$store.getters["docflow/numberingType"](this)
    };
  },
  methods: {
    edit(e) {
      this.$router.push(`/docflow/document-type/${e.data.id}`);
    },
    documentKindDetailForm(e) {
      this.$router.push(`/docflow/document-type/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = async () => {
          this.$router.push(`/docflow/document-type/create`);
        };
      }
    }
  }
};
</script>
