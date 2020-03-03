<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
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
        :allow-updating="userPermissions.allowUpdating"
        :allow-deleting="userPermissions.allowDeleteing"
        :allow-adding="userPermissions.allowDeleteing"
        mode="form"
        :useIcons="true"
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
        alignment="left"
        data-type="string"
      ></DxColumn>

      <DxColumn data-field="documentFlow" :caption="$t('translations.fields.documentFlow')">
        <DxLookup :data-source="documentFlow" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="numberingType" :caption="$t('translations.fields.numberingType')">
        <DxLookup :data-source="numberingType" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="documentTypeId" :caption="$t('translations.menu.documentType')">
        <DxLookup :data-source="documentType" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
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
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxStateStoring,
  DxFilterRow
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
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxFilterRow
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
      statusStores: this.$store.getters["status/status"],
      documentFlow: [
        { id: 0, name: this.$t("translations.fields.incomingEnum") },
        { id: 1, name: this.$t("translations.fields.outcomingEnum") },
        { id: 2, name: this.$t("translations.fields.inner") },
        { id: 3, name: this.$t("translations.fields.contracts") }
      ],
      numberingType: [
        { id: 0, name: this.$t("translations.fields.numerable") },
        { id: 1, name: this.$t("translations.fields.notNumerable") },
        { id: 2, name: this.$t("translations.fields.registrable") }
      ],
      documentType: [],
      initNewRow: e => {
        this.$router.push('/docFlow/document-kind/add-docKind')
      },
      rowUpdating: e => {
         // this.$router.push('/docFlow/docKindForms/newDocKind')
      }
    };
  },
  methods: {
  },
  computed: {
    userPermissions() {
      return this.$store.getters["roles/userPermissions"];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";

.container {
  display: block;
}
</style>
