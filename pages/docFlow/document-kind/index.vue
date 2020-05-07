<template>
  <main>
    <Header :headerTitle="$t('translations.menu.documentKind')"></Header>
    <DxDataGrid
      id="gridContainer"      
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
     @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.documentKind')"
      />

      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="documentKind" />

      <DxEditing
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        mode="form"
        :useIcons="true"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('translations.fields.name')"
        alignment="left"
        data-type="string"
      ></DxColumn>

      <DxColumn data-field="documentFlow" :caption="$t('translations.fields.documentFlow')">
        <DxLookup
          :allow-clearing="true"
          :data-source="documentFlow"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="numberingType" :caption="$t('translations.fields.numberingType')">
        <DxLookup
          :allow-clearing="true"
          :data-source="numberingType"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="documentTypeId" :caption="$t('translations.menu.documentType')">
        <DxLookup
          :allow-clearing="true"
          :data-source="documentTypeDataSource"
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
      <DxColumn type="buttons">
        <DxButton
          icon="card"
          :text="$t('translations.headers.editDocumentKind')"
          :onClick="documentKindDetailForm"
        ></DxButton>

        <DxButton icon="trash" name="delete"></DxButton>
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
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind,
        insertUrl: dataApi.docFlow.DocumentKind,
        updateUrl: dataApi.docFlow.DocumentKind,
        removeUrl: dataApi.docFlow.DocumentKind
      }),
      entityType: EntityType.DocumentKind,
      statusDataSource: this.$store.getters["status/status"](this),
      documentFlow: this.$store.getters["docflow/docflow"](this),
      numberingType: this.$store.getters["docflow/numberingType"](this),
      documentTypeDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.DocumentType
        }),
        paginate: true
      }
    };
  },
  methods: {
    documentKindDetailForm(e) {
      this.$router.push(`/docflow/document-kind/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$router.push("/docflow/document-kind/create");
        };
      }
    }
  }
};
</script>

