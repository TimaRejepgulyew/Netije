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
      @editing-start="editingStart"
      @init-new-row="initNewRow"
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
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
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
        data-field="addresseeId"
        :caption="$t('translations.fields.addresseeId')"
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
      headerTitle: this.$t("translations.menu.order"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.Order,
        removeUrl: dataApi.paperWork.DeleteDocument
      }),

      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        this.$router.push("/paper-work/order/form/add");
      },

      editingStart: e => {
        this.$router.push("/paper-work/order/form/" + e.key);
      },
      businessUnitStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.CounterPart
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
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
