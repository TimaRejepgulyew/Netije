<template>
  <main>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      :ref="dataGridRefKey"
      @init-new-row="initNewRow"
    >
      >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      
      <DxHeaderFilter :visible="true" />
      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="allowDeleting"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
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

      <DxColumn data-field="employeeId" :caption="$t('translations.fields.name')">
        <DxLookup
          :allow-clearing="true"
          :data-source="getFilteredMembers"
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
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let { id } = this.data.data;
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "employeeId",
          insertUrl: dataApi.company.DepartmentMembers,
          loadUrl: dataApi.company.DepartmentMembers + id,
          removeUrl: dataApi.company.DepartmentMembers + id
        })
      }),
      entityType: "Department",
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
      statusDataSource: this.$store.getters["status/status"]
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

</style>
