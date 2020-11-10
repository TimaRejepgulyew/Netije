<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowRemoved="e => updateActionItemParts(e)"
      @rowInserted="e => updateActionItemParts(e)"
      @rowUpdated="e => updateActionItemParts(e)"
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
      <DxColumn data-field="assigneeId" :caption="$t('task.fields.assigneeId')">
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeStore"
          value-expr="id"
          display-expr="name"
        />
        <DxRequiredRule :message="$t('task.validation.assigneeIdRequired')" />
      </DxColumn>
      <DxColumn
        data-field="actionItemPart"
        :caption="$t('task.fields.actionItemPart')"
      >
      </DxColumn>
      <DxColumn
        data-type="datetime"
        data-field="deadline"
        :caption="$t('task.fields.deadline')"
      >
        <DxRequiredRule :message="$t('task.validation.deadlineRequired')" />
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
  DxRequiredRule,
  DxButton,
  DxLookup
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxRequiredRule,
    DxButton,
    DxLookup
  },
  props: ["taskId"],
  data() {
    return {
      data: this.$store.getters[`task/${this.taskId}/actionItemParts `]
    };
  },
  methods: {
    updateActionItemParts() {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));

      this.$store.commit(`task/${this.taskId}/SET_ACTION_ITEM_PARTS`, payload);
    }
  },
  computed: {
    // data() {
    //   return this.$store.getters[`tasks/${this.assignmentId}/assignment`];
    // },
    employeeStore() {
      return this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      });
    }
  }
};
</script>

<style></style>
