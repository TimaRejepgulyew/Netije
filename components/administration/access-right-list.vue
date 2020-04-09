<template>
  <main>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :ref="dataGridRefKey"
      @init-new-row="initNewRow"
    >
      >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />
      <DxEditing
        :allow-updating="false"
        :allow-deleting="false"
        :allow-adding="false"
        :useIcons="true"
        mode="row"
      />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.registrationSetting')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="registration-setting-detail"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="memberId" :caption="$t('translations.fields.name')">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredMembers"
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

      <DxColumn
        data-field="description"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
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
  DxFilterRow,
  DxStateStoring,
  DxRequiredRule,
  DxAsyncRule
} from "devextreme-vue/data-grid";

export default {
  components: {
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
    DxFilterRow,
    DxRequiredRule,
    DxAsyncRule,
    DxStateStoring
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    let { id, immutable } = this.data.data;
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "memberId",
          insertUrl: dataApi.admin.RoleMembers,
          loadUrl: dataApi.admin.RoleMembers + id,
          removeUrl: dataApi.admin.RoleMembers + id
        })
      }),
      immutable,
      getFilteredMembers: this.$dxStore({
        loadUrl: dataApi.admin.Recipient
      }),
      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
        e.data.roleId = id;
      },
      dataGridRefKey: "dataGrid",
      statusStores: this.$store.getters["status/status"]
    };
  },
  computed: {
    dataGrid: function() {
      return this.$refs[this.dataGridRefKey].instance;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
  text-align: start;
}
</style>