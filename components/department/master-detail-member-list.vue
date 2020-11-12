<template>
  <DxTabPanel :tab-panel-options="tabPanelOptions">
    <DxItem :title="$t('translations.fields.members')" template="members-list" />
    <template #members-list>
      <DxDataGrid
        id="gridContainer"
        :errorRowEnabled="false"
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        @init-new-row="onInitNewRow"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing
          :allow-updating="false"
          :allow-deleting="allowDeleting"
          :allow-adding="$store.getters['permissions/allowUpdating'](entityType)"
          :useIcons="true"
          mode="row"
        />

        <DxFilterRow :visible="true" />

        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn data-field="employeeId" :caption="$t('shared.name')">
          <DxLookup
            :allow-clearing="true"
            :data-source="getActiveEmployees"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>
      </DxDataGrid>
    </template>
    <!-- TODO:V2.0<DxItem :title="$t('translations.fields.permissions')" template="permissions" />
    <permissions slot="permissions" :data="data.id" />-->
  </DxTabPanel>
</template>

<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import permissions from "~/components/administration/permissions";
import dataApi from "~/static/dataApi";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxFilterRow,
  DxButton,
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxTabPanel,
    DxItem,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxFilterRow,
    permissions,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    let { id } = this.data;
    return {
      entityType: EntityType.Department,
      departmentId: id,
      store: this.$dxStore({
        key: "employeeId",
        insertUrl: dataApi.company.DepartmentMembers,
        loadUrl: dataApi.company.DepartmentMembers + id,
        removeUrl: dataApi.company.DepartmentMembers + id,
      }),
      statusDataSource: this.$store.getters["status/status"],
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true",
      },
    };
  },
  methods: {
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.id]
          : [],
      };
    },
    onInitNewRow(e) {
      e.data.departmentId = this.departmentId;
      e.data.employeeId = null;
    },
    allowDeleting(e) {
      if (
        this.$store.getters["permissions/allowUpdating"](this.entityType) &&
        !e.row.data.isReadonly
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>