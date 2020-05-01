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
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
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
        :file-name="$t('translations.menu.incommingLetter')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="incommingLetter" />

      <DxEditing :allow-deleting="true" :allow-adding="true" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="dated" :caption="$t('translations.fields.dated')" data-type="date" />
      <DxColumn
        data-field="created"
        :caption="$t('translations.fields.createdDate')"
        data-type="date"
      />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn data-field="inNumber" :caption="$t('translations.fields.regNumberDocument')"></DxColumn>
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

      <DxColumn :visible="false" data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
      <DxColumn
        :visible="false"
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
        :visible="false"
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
      headerTitle: this.$t("translations.menu.incommingLetter"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.IncommingLetter,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),
      entityType: "IncomingLetter",
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
      ]
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
