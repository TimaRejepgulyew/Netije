<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowUpdating="e => rowUpdating(e)"
      :remote-operations="false"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :showColumnLines="false"
      :showRowLines="false"
    >
      <DxEditing
        :allow-adding="false"
        :allow-updating="true"
        :useIcons="true"
        mode="row"
      />
      <DxColumn
        editor-type="dxSelectBox"
        data-field="approverId"
        :caption="$t('assignment.fields.approver')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeStore"
          value-expr="id"
          display-expr="name"
        />
        <DxRequireRule />
      </DxColumn>
      <DxColumn
        editor-type="dxCheckBox"
        :allowEditing="false"
        data-field="approved"
        :caption="$t('assignment.fields.approved')"
      />
      <DxColumn
        editor-type="dxSelectBox"
        data-field="value"
        :caption="$t('assignment.fields.action')"
      >
        <DxRequireRule />
        <DxLookup
          :allow-clearing="true"
          :data-source="actionStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import FreeApprovalReworkActions from "~/infrastructure/constants/assignment/freeApproveReworkActions.js";
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxRequireRule,
  DxButton,
  DxLookup
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxRequireRule,
    DxButton,
    DxLookup
  },
  props: ["assignemntId"],
  data() {
    const data = JSON.parse(
      JSON.stringify(
        this.$store.getters[`documents/${this.assignemntId}/document`].params
      )
    );
    return {
      data
    };
  },
  methods: {
    rowUpdating(e) {
      this.$store.commit(`assignments/${this.assignemntId}/SET_APPROVERS`, {
        name: e.key.name,
        value: e.newData.value
      });
    }
  },
  computed: {
    employeeStore() {
      return this.$dxStore({
        loadUrl: dataApi.company.Employee
      });
    },
    actionStore() {
      return [
        {
          id: FreeApprovalReworkActions.SendForApproval,
          name: this.$t("assigment.stores.sendForApproval")
        },
        {
          id: FreeApprovalReworkActions.DoNotSend,
          name: this.$t("assigment.stores.doNotSend")
        },
        {
          id: FreeApprovalReworkActions.SendNotice,
          name: this.$t("assigment.stores.sendNotice")
        }
      ];
    }
  }
};
</script>

<style></style>
