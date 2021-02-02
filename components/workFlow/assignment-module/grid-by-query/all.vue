<template>
  <main>
    <Header :isbackButton="true" :headerTitle="headerTitle">
      <toolbar-item-quick-filter
        slot="toolbar"
       
        @valueChanged="setStore"
        :assignmentQuery="+assignmentQuery"
      />
    </Header>
    <div class="grid">
      <DxDataGrid
        id="gridContainer"
        :columns="columns"
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :hover-state-enabled="true"
        :column-auto-width="false"
        :show-column-lines="false"
        :load-panel="{
          enabled: true,
          indicatorSrc: require('~/static/icons/loading.gif'),
        }"
        :onRowDblClick="showAssignment"
        :on-row-prepared="onRowPrepared"
        @toolbar-preparing="addButtonToGrid($event)"
      >
        <DxGroupPanel :visible="true" />
        <DxGrouping :auto-expand-all="false" />

        <DxColumnChooser :enabled="true" />
        <DxColumnFixing :enabled="true" />

        <DxFilterRow :visible="true" />

        <DxExport
          :enabled="true"
          :allow-export-selected-data="true"
          :file-name="$t('assignment.gridFileName')"
        />
        
        <DxStateStoring
          :enabled="true"
          type="localStorage"
          :storage-key="'assignment' + assignmentQuery"
        />
        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />
        <template #importanceIconColumn="cell">
          <importanceIconColumn
            v-if="cell.data.value"
            :state="cell.data.value"
          />
        </template>
        <template #assignnmentTypeIconColumn="cell">
          <assignnmentTypeIconColumn
            :assignmentType="cell.data.value"
            :assignmentTypes="assignmentTypes"
          />
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import assignmentMixin from "../infrastructure/mixins/assignmentGridTemplateMixin.js";
import AssignmentgGridColumnFactory from "../infrastructure/factory/assignmentGridFactory";
export default {
  mixins: [assignmentMixin],
  props: {
    assignmentQuery: {
      type: Number,
      default: () => {},
    },
  },
  computed: {
    columns() {
      return AssignmentgGridColumnFactory.CreateColumns(
        this.assignmentQuery,
        this
      );
    },
  },
};
</script>
<style>
.forExecutionBtn {
  width: auto;
  height: 20px;
}
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}
</style>
