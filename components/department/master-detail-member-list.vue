<template>
  <div class="master_detail_member_list">
    <DxTabPanel :tab-panel-options="tabPanelOptions">
      <DxItem :title="$t('translations.fields.members')" template="members-list" />
      <template #members-list>
        <DxDataGrid
          id="gridContainer"
          :errorRowEnabled="false"
          :show-borders="true"
          :data-source="store"
          :remote-operations="false"
          @init-new-row="onInitNewRow"
          height="400"
        >
          <DxHeaderFilter :visible="true" />
          <DxEditing
            :allow-updating="false"
            :allow-deleting="allowDeleting"
            :allow-adding="
            $store.getters['permissions/allowUpdating'](entityType)
          "
            :useIcons="true"
            mode="row"
          />
          <!-- <DxColumn :width="110" :buttons="editButtons" type="buttons" /> -->

          <DxFilterRow :visible="true" />

          <DxSearchPanel position="after" :visible="true" />

          <DxColumn
            editCellTemplate="employeeSelectBox"
            cellTemplate="employeeSelectBox"
            data-field="employeeId"
            :caption="$t('shared.name')"
          ></DxColumn>
          <!-- <DxLookup
            :allow-clearing="true"
            :data-source="getActiveEmployees"
            value-expr="id"
            display-expr="name"
          />-->
          <template #employeeSelectBox="{data:cellInfo}">
            <employee-select-box
              valueExpr="id"
              displayExpr="name"
              :value="cellInfo.value"
              @valueChanged="value => updateEmployeeId(value, cellInfo)"
              :readOnly="!cellInfo.data.isNewRow"
            />
          </template>
        </DxDataGrid>
      </template>
      <!-- TODO:V2.0<DxItem :title="$t('translations.fields.permissions')" template="permissions" />
      <permissions slot="permissions" :data="data.id" />-->
    </DxTabPanel>
  </div>
</template>

<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import permissions from "~/components/administration/permissions";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
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
  DxButton
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
    employeeSelectBox,
    permissions
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
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
        removeUrl: dataApi.company.DepartmentMembers + id
      }),
      statusDataSource: this.$store.getters["status/status"],
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true"
      },
      editButtons: [
        {
          name: "edit"
        },
        {
          icon: "card",
          onClick: this.updateServiceData
        }
      ]
    };
  },
  methods: {
    updateEmployeeId(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.id]
          : undefined
      };
    },
    onInitNewRow(e) {
      e.data.departmentId = this.departmentId;
      e.data.isNewRow = true;
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
    }
  }
};
</script>


<style lang="scss">
.master_detail_member_list {
  .dx-datagrid
    .dx-datagrid-content
    .dx-datagrid-table
    .dx-row
    .dx-command-edit-with-icons
    .dx-link {
    width: 18px;
    height: 18px;
    background-position: 0 0;
    background-size: 18px 18px;
    padding: 5px 0;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    margin: 0 3px;
  }
}
</style>
