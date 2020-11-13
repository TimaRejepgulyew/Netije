<template>
  <DxTabPanel :tab-panel-options="tabPanelOptions">
    <DxItem
      :title="$t('translations.fields.members')"
      template="members-list"
    />
    <template #members-list>
      <DxDataGrid
        id="gridContainer"
        :errorRowEnabled="false"
        :show-borders="true"
        :data-source="store"
        :remote-operations="false"
        @init-new-row="onInitNewRow"
        @row-inserting="rowInserting"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing
          :allow-updating="false"
          :allow-deleting="canDelete"
          :allow-adding="!immutable"
          :useIcons="true"
          mode="row"
        ></DxEditing>

        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn
          :allowFiltering="false"
          :allowSorting="false"
          :allowResizing="false"
          :allowReordering="false"
          :allowHiding="false"
          :allowHeaderFiltering="false"
          :allowGrouping="false"
          :allowFixing="false"
          :allowExporting="false"
          :allow-sorting="false"
          editCellTemplate="recipientSelectBox"
          data-field="member.name"
          data-type="string"
          :caption="$t('shared.name')"
        ></DxColumn>
        <template #recipientSelectBox="{ data: cellInfo }">
          <recipient-select-box
            valueExpr="id"
            :value="cellInfo.value"
            :isRequired="true"
            @valueChanged="value => onValueChanged(value, cellInfo)"
          />
        </template>
      </DxDataGrid>
    </template>
    <!-- TODO:V2.0<DxItem :title="$t('translations.fields.permissions')" template="permissions" />
    <permissions slot="permissions" :data="data.id" />-->
  </DxTabPanel>
</template>

<script>
import recipientSelectBox from "~/components/recipient/select-box/index.vue";
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
  DxButton
} from "devextreme-vue/data-grid";
import RecipientType from "~/infrastructure/constants/resipientType.js";
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
    permissions,
    recipientSelectBox
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
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
        removeUrl: dataApi.admin.RoleMembers + id
      }),
      statusDataSource: this.$store.getters["status/status"],
      recipientStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.recipient.list
      }),
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true"
      }
    };
  },

  methods: {
    canDelete(e) {
      return (
        !this.immutable &&
        !(
          e.row.data.member?.isSystem &&
          e.row.data.member?.recipientType === RecipientType.SystemUser
        )
      );
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    rowInserting(e) {
      e.data.memberId = e.data.member.name;
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
    }
  }
};
</script>
