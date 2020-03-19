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
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />
      <DxEditing
        :allow-updating="false"
        :allow-deleting="immutable"
        :allow-adding="immutable"
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

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="employeeId" :caption="$t('translations.fields.name')">
        <DxLookup :data-source="getFilteredMembers" value-expr="id" display-expr="name" />
      </DxColumn>
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
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxButton
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
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  props: {
    membersList: {
      type: Object,
      default: () => {}
    }
  },
  async created() {
    this.members = await this.getDataById(
      dataApi.company.DepartmentMembers + this.membersList.key
    );
  },
  data() {
    let { id, immutable } = this.membersList.data;
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "employeeId",
          insertUrl: dataApi.company.DepartmentMembers,
          loadUrl: dataApi.company.DepartmentMembers + id,
          removeUrl: dataApi.company.DepartmentMembers + id
        })
      }),
      immutable,
      getFilteredMembers: this.$dxStore({
        loadUrl: dataApi.company.Employee
      }),
      members: [],
      allowDeleting: e => {
        return !e.row.data.isReadonly;
      },
      initNewRow: e => {
        e.data.departmentId = id;
        e.data.employeeId = null;
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
  methods: {
    async getDataById(address) {
      const res = await this.$axios.get(address);
      return res.data.data;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>