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
        :file-name="$t('translations.menu.simpleAssignment')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="simpleAssignment" />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="false"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="deadline"
        :caption="$t('translations.fields.deadLine')"
        data-type="date"
      />

      <DxColumn
        data-field="created"
        :caption="$t('translations.fields.createdDate')"
        data-type="date"
      />

      <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>

      <DxColumn data-field="authorId" :caption="$t('translations.fields.authorId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <!-- <DxColumn
        data-field="taskId"
        :caption="$t('translations.fields.taskId')"
        data-type="selectbox"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="documentKindStores"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>-->
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
      headerTitle: this.$t("translations.headers.simpleTask"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.task.SimpleAssignment
      }),

      initNewRow: e => {
        this.$router.push("/task/simple-assignment/form/create-simple-task");
      },

      editingStart: e => {
        // console.log(e.key);
        this.$router.push("/task/simple-assignment/form/" + e.key);
      },
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      })
      // documentKindStores: this.$dxStore({
      //   key: "id",
      //   loadUrl: dataApi.docFlow.DocumentKind
      // })
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
