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
      :showColumnLines="true"
      :showRowLines="false"
      :noDataText="$t('task.addNewAssineers')"
    >
      <DxEditing
        :allow-adding="!readOnly"
        :allow-updating="!readOnly"
        :allow-deleting="!readOnly"
        :useIcons="true"
        mode="cell"
      />
      <DxColumn
        data-type="string"
        :customizeText="customizeText"
        data-field="assignee"
        editCellTemplate="assignee"
        :caption="$t('task.fields.assignee')"
      >
        <!-- <DxRequiredRule :message="$t('task.validation.assigneeRequired')" /> -->
      </DxColumn>
      <template #assignee="{ data: cellInfo }">
        <employee-select-box
          :showClearButton="false"
          :value="cellInfo.value"
          @valueChanged="value => onValueChanged(value, cellInfo)"
        />
      </template>
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
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
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
    DxLookup,
    employeeSelectBox
  },
  props: ["taskId", "canUpdate"],
  data() {
    return {
      data: this.$store.getters[`tasks/${this.taskId}/actionItemParts`]
    };
  },
  methods: {
    updateActionItemParts() {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));

      this.$store.commit(`tasks/${this.taskId}/SET_ACTION_ITEM_PARTS`, payload);
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    customizeText(e) {
      if (e.value) return e.value.name;
    }
  },
  computed: {
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
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
