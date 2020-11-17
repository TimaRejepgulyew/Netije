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
        @row-inserting="rowInserting"
        @init-new-row="onInitNewRow"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing
          :allow-updating="false"
          :allow-deleting="allowDeleting"
          :allow-adding="allowAdding"
          :useIcons="true"
          mode="row"
        />

        <DxFilterRow :visible="true" />

        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn
          editCellTemplate="recipientSelectBox"
          data-field="member.name"
          :caption="$t('shared.name')"
        >
        </DxColumn>
        <template #recipientSelectBox="{ data: cellInfo }">
          <recipient-select-box
            valueExpr="id"
            :value="cellInfo.value"
            @valueChanged="value => onValueChanged(value, cellInfo)"
          />
        </template>
        <DxColumn
          :allowEditing="false"
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
          data-field="member.description"
          data-type="string"
          :caption="$t('shared.description')"
        ></DxColumn>
      </DxDataGrid>
    </template>

    <!-- TODO:V2.0 <DxItem :title="$t('translations.fields.permissions')" template="permissions" />
    <permissions slot="permissions" :data="data.id" />-->
  </DxTabPanel>
</template>

<script>
import recipientSelectBox from "~/components/recipient/select-box/index.vue";
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
    let { id, responsibleEmployeeId } = this.data.data;
    return {
      id,
      responsibleEmployeeId,
      store: this.$dxStore({
        key: "memberId",
        insertUrl: dataApi.docFlow.RegistrationGroupMembers,
        loadUrl: dataApi.docFlow.RegistrationGroupMembers + id,
        removeUrl: dataApi.docFlow.RegistrationGroupMembers + id
      }),
      statusDataSource: this.$store.getters["status/status"],
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true"
      }
    };
  },
  computed: {
    allowAdding() {
      return (
        this.$store.getters["permissions/IsAdmin"] ||
        this.$store.getters["permissions/employeeId"] ==
          this.responsibleEmployeeId
      );
    }
  },
  methods: {
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    getActiveRecipients(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.id]
          : []
      };
    },
    rowInserting(e) {
      e.data.memberId = e.data.member.name;
      delete e.data.member;
    },
    onInitNewRow(e) {
      console.log(e);
      e.data.member;
      e.data.registrationGroupId = this.id;
    },
    allowDeleting(e) {
      if (
        !this.$store.getters["permissions/IsAdmin"] &&
        !this.$store.getters["permissions/employeeId"] ==
          this.responsibleEmployeeId
      ) {
        return false;
      }
      return e.row.key != this.responsibleEmployeeId;
    }
  }
};
</script>
