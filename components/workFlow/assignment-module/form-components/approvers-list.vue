<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowRemoved="(e) => updateApprovers(e)"
      @rowInserted="(e) => updateApprovers(e)"
      @rowUpdated="(e) => updateApprovers(e)"
      :remote-operations="false"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :showColumnLines="false"
      :showRowLines="false"
    >
      <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="row"
      />
      <DxColumn
        data-field="approver"
        :caption="$t('assignment.fields.approver')"
        cellTemplate="approver"
        editCellTemplate="editApprover"
      >
        <DxRequiredRule
          :message="$t('assigment.validation.approverRequired')"
        />
      </DxColumn>
      <template #approver="{ data: cellInfo }">
        <employee-select-box
          v-if="cellInfo.value"
          :readOnly="true"
          :value="cellInfo.value"
          messageRequired="assigment.validation.approverRequired"
        ></employee-select-box>
      </template>
      <template #editApprover="{ data: cellInfo }">
        <employee-select-box
          :value="cellInfo.value"
          messageRequired="assigment.validation.approverRequired"
          @valueChanged="(value) => updateEmployeeId(value, cellInfo)"
        ></employee-select-box>
      </template>
      <DxColumn
        editor-type="dxCheckBox"
        :allowEditing="false"
        data-field="approved"
        :caption="$t('assignment.fields.approved')"
      />
      <DxColumn data-field="action" :caption="$t('assignment.fields.action')">
        <DxRequiredRule :message="$t('assigment.validation.actionRequired')" />
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
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import FreeApprovalReworkActions from "../../infrastructure/constants/freeApproveReworkActions.js";
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxRequiredRule,
  DxButton,
  DxLookup,
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxRequiredRule,
    DxButton,
    DxLookup,
    employeeSelectBox,
  },
  props: ["assignmentId"],
  data() {
    return {
      data: this.$store.getters[`assignments/${this.assignmentId}/approvers`],
    };
  },
  methods: {
    updateEmployeeId(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    updateApprovers() {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));

      this.$store.commit(
        `assignments/${this.assignmentId}/SET_APPROVERS`,
        payload
      );
    },
  },
  computed: {
    employeeStore() {
      return this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee,
      });
    },
    actionStore() {
      return [
        {
          id: FreeApprovalReworkActions.SendForApproval,
          name: this.$t("assignment.stores.sendForApproval"),
        },
        {
          id: FreeApprovalReworkActions.DoNotSend,
          name: this.$t("assignment.stores.doNotSend"),
        },
        {
          id: FreeApprovalReworkActions.SendNotice,
          name: this.$t("assignment.stores.sendNotice"),
        },
      ];
    },
  },
};
</script>

<style></style>
