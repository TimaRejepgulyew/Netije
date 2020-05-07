<template>
  <main>
    <DxDataGrid
      id="gridContainer"      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @init-new-row="onInitNewRow"
    >
      <DxEditing
        :allow-deleting="allowDeleting"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="row"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="employeeId" :caption="$t('translations.fields.name')">
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxLookup
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxLookup
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
      departmentId: id,
      entityType: EntityType.Department,
      dataSource: {
        store: this.$dxStore({
          key: "employeeId",
          insertUrl: dataApi.company.DepartmentMembers,
          loadUrl: dataApi.company.DepartmentMembers + id,
          removeUrl: dataApi.company.DepartmentMembers + id
        })
      },
      employeeDataSource: {
        store: this.$dxStore({
          loadUrl: dataApi.company.Employee
        }),
        paginate: true
      }
    };
  },
  methods: {
    allowDeleting(e) {
      return !e.row.data.isReadonly&& this.$store.getters['permissions/allowUpdating'](this.entityType);
    },
    onInitNewRow(e) {
      e.data.departmentId = this.departmentId;
      e.data.employeeId = null;
    }
  }
};
</script>
