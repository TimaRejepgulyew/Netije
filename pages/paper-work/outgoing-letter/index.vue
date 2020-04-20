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
      :onRowDblClick="toMoreAbout"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.outgoingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="outgoingLetter" />

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
      headerTitle: this.$t("translations.menu.outgoingLetter"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.OutgoingLetter,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "OutgoingLetter",
      statusStores: this.$store.getters["status/status"],

      toMoreAbout: e => {
        this.$store.getters["globalProperties/toForm"](this, e.key);
      },
      onToolbarPreparing(e) {
        e.toolbarOptions.items[1].options.onClick = () => {
          this.$store.getters["globalProperties/toForm"](this);
        };
      },
      correspondentStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
      }),
      documentKindStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentKind
      })
    };
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
