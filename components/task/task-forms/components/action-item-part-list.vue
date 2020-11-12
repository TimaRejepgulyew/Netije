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
      :noDataText="$t('task.addNewAssineers')"
    >
      <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="cell"
      />
      <DxColumn data-field="assignee" :caption="$t('task.fields.assignee')">
     
        <DxRequiredRule :message="$t('task.validation.assigneeRequired')" />
      </DxColumn>

      <DxColumn
        data-field="actionItemPart"
        :caption="$t('task.fields.actionItem')"
      >
      </DxColumn>
      <DxColumn
        data-type="datetime"
        data-field="deadline"
        :caption="$t('task.fields.deadline')"
      >
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script>
import DataSource from "devextreme/data/data_source";
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
      data: this.$store.getters[`tasks/${this.taskId}/actionItemParts`]
    };
  },
  methods: {
    updateActionItemParts() {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));

      this.$store.commit(`tasks/${this.taskId}/SET_ACTION_ITEM_PARTS`, payload);
    }
  },
  computed: {
    // data() {
    //   return this.$store.getters[`tasks/${this.assignmentId}/assignment`];
    // },
    employeeStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        pageSize: 10
      });
    }
  }
};
</script>

<style></style>
