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
        @row-inserting="rowInserting"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing
          :allow-updating="false"
          :allow-deleting="canDelete"
          :allow-adding="!immutable"
          :useIcons="true"
          mode="batch"
        >
          <div>
            <DxSelectBox
              display-expr="name"
              value-expr="id"
              :data-source="recipientStore"
              :value="0"
              :on-value-changed="(value) => onValueChanged(value, cellInfo)"
            />
          </div>
        </DxEditing>

        <DxFilterRow :visible="true" />

        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn
          editCellTemplate="nameSelectBoxcomponent"
          data-field="member.name"
          data-type="string"
          :caption="$t('translations.fields.name')"
        ></DxColumn>
        <template #nameSelectBoxcomponent="{ data: cellInfo }">
          <DxSelectBox
            display-expr="name"
            value-expr="id"
            :data-source="recipientStore"
            :value="cellInfo.value"
            :on-value-changed="(value) => onValueChanged(value, cellInfo)"
          />
        </template>
      </DxDataGrid>
    </template>
    <!-- TODO:V2.0<DxItem :title="$t('translations.fields.permissions')" template="permissions" />
    <permissions slot="permissions" :data="data.id" />-->
  </DxTabPanel>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";
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
    DxSelectBox,
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
    let { id, immutable } = this.data.data;
    return {
      entityType: EntityType.Department,
      roleId: id,
      immutable,
      store: this.$dxStore({
        key: "memberId",
        insertUrl: dataApi.admin.RoleMembers,
        loadUrl: dataApi.admin.RoleMembers + id,
        removeUrl: dataApi.admin.RoleMembers + id,
      }),
      statusDataSource: this.$store.getters["status/status"],
      recipientStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.recipient.list,
      }),
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true",
      },
    };
  },

  methods: {
    canDelete(e) {
      console.log(e.row.data);
      return !this.immutable && !e.row.data.member?.isSystem;
    },
    onValueChanged(value, cellInfo) {
      console.log(cellInfo, value);
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    rowInserting(e) {
      e.data.memberId = e.data.member.name.value;
      delete e.data.member;
    },
    onInitNewRow(e) {
      e.data.roleId = this.roleId;
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
