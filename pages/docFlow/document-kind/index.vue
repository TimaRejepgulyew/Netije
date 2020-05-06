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
      <DxSelection mode="multiple" />

      <DxHeaderFilter :visible="true" />
      <DxFilterRow :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="documentKind" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
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
          :data-source="documentType"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusStores"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="edit"
          :text="$t('translations.headers.editDocumentKind')"
          :onClick="editDocumentKindForm"
          :visible="$store.getters['permissions/allowUpdating'](entityType)"
        ></DxButton>

        <DxButton icon="trash" name="delete"></DxButton>
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
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxSelection,
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
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxFilterRow,
    DxButton
  },
  async created() {
    let docType = await this.$axios.get(dataApi.docFlow.DocumentType);
    this.documentType = docType.data.data;
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.documentKind"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind,
        insertUrl: dataApi.docFlow.DocumentKind,
        updateUrl: dataApi.docFlow.DocumentKind,
        removeUrl: dataApi.docFlow.DocumentKind
      }),
      entityType: "DocumentKind",
      statusStores: this.$store.getters["status/status"](this),
      documentFlow: [
        { id: 0, name: this.$t("translations.fields.incomingEnum") },
        { id: 1, name: this.$t("translations.fields.outcomingEnum") },
        { id: 2, name: this.$t("translations.fields.inner") },
        { id: 3, name: this.$t("translations.fields.contracts") }
      ],
      numberingType: [
        { id: 1, name: this.$t("translations.fields.registrable") },
        { id: 2, name: this.$t("translations.fields.numerable") },
        { id: 3, name: this.$t("translations.fields.notNumerable") }
      ],
      documentType: [],

      editingStart: e => {
        this.$router.push("/docflow/document-kind/upsert/" + e.data.id);
      }
    };
  },
  methods: {
    editDocumentKindForm(e) {
      this.$router.push(`/docflow/document-kind/upsert/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$router.push("/docflow/document-kind/upsert/new");
        };
      }
    },
  }
};
</script>

