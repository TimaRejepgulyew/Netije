<template>
  <DxTabPanel>
    <DxItem :title="$t('translations.fields.members')" template="members-list" />
    <template #members-list>
      <DxDataGrid
        id="gridContainer"
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
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

        <DxColumn data-field="memberId" :caption="$t('translations.fields.name')">
          <DxLookup
            :allow-clearing="true"
            :data-source="getActiveEmployees"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>
      </DxDataGrid>
    </template>
    <DxItem :title="$t('translations.fields.permissions')" template="permissions" />
    <permissions slot="permissions" :data="data.id" />
  </DxTabPanel>
</template>

<script>
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
    permissions
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
      statusDataSource: this.$store.getters["status/status"]
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
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        filter: options.data
          ? ["status", "=", Status.Active, "or", "id", "=", options.data.id]
          : []
      };
    },
    onInitNewRow(e) {
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