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
        @selection-changed="onSelectionChanged"
        :load-panel="{
          enabled: true,
          indicatorSrc: require('~/static/icons/loading.gif'),
        }"
        :onRowDblClick="showAssignment"
        :on-row-prepared="onRowPrepared"
        @toolbar-preparing="addButtonToGrid($event)"
      >
        <DxSelection
          mode="multiple"
          show-check-boxes-mode="always"
          select-all-mode="allPages"
        />
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
        <DxScrolling mode="virtual" row-rendering-mode="virtual" />
        <DxPaging :page-size="20" />
        <template #importanceIconColumn="cell">
          <importanceIconColumn
            v-if="cell.data.value"
            :state="cell.data.value"
          />
        </template>
        <template #assignnmentTypeIconColumn="cell">
          <assignnmentTypeIconColumn
            class="icon--type"
            :assignmentType="cell.data.value"
            :assignmentTypes="assignmentTypes"
          />
        </template>
        <template #test>
          <div class="dx-item dx-toolbar-item dx-toolbar-button">
            <DxButton
              :disabled="!canAddResolution"
              :onClick="addResolutionAll"
              styling-mode="text"
              text="Утвердить все"
              :icon="addResolution"
            />
          </div>
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import dataApi from "~/static/dataApi";
import AssignmentStatus from "../../infrastructure/constants/assignmentStatus";
import AssignmentType from "../../infrastructure/constants/assignmentType";
import AssignmentgGridColumnFactory from "../infrastructure/factory/assignmentGridFactory";

import assignmentMixin from "../infrastructure/mixins/assignmentGridTemplateMixin.js";
import addResolution from "~/static/icons/status/addresolution.svg";

import DxButton from "devextreme-vue/button";
import { confirm } from "devextreme/ui/dialog";
import { DxSelection } from "devextreme-vue/data-grid";
export default {
  components: {
    DxSelection,
    DxButton,
  },
  mixins: [assignmentMixin],
  props: {
    assignmentQuery: {
      type: Number,
      default: () => {},
    },
  },
  data() {
    return {
      addResolution,
      canAddResolution: false,
      selectedAssignemnts: [],
    };
  },
  methods: {
    addButtonToGrid(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: this.reload,
        },
      });
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          template: "test",
        },
      });
    },
    async addResolutionAll(e) {
      const result = await confirm(
        this.$t("assignment.confirmMessage.sureAddResolutionAllSelection"),
        this.$t("shared.areYouSure")
      );
      if (!result) return;
      const assignments = [];
      this.selectedAssignemnts.forEach((element) => {
        assignments.push(element.id);
      });
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.assignment.CompleteDraftResolutionAssignments,
          { assignments: assignments }
        ),
        () => {
          this.store.reload();
          this.canAddResolution = false;
          this.selectedAssignemnts = [];
          this.$awn.success();
        }
      );
    },
    checkIsReviewDraftResolutionAssignment(assignmentType) {
      return assignmentType === AssignmentType.ReviewDraftResolutionAssignment;
    },
    checkIsInProccessAssignment(status) {
      return status === AssignmentStatus.InProcess;
    },
    onSelectionChanged({ selectedRowKeys, selectedRowsData }) {
      this.selectedAssignemnts = selectedRowsData;
      if (this.selectedAssignemnts.length !== 0) {
        this.canAddResolution = this.selectedAssignemnts.every(
          (selectedItemData) => {
            return (
              this.checkIsReviewDraftResolutionAssignment(
                selectedItemData.assignmentType
              ) && this.checkIsInProccessAssignment(selectedItemData.status)
            );
          }
        );
      } else {
        this.canAddResolution = false;
      }
    },
  },
  computed: {
    test() {
      return this.canAddResolution;
    },
    columns() {
      return AssignmentgGridColumnFactory.CreateColumns(
        this.assignmentQuery,
        this
      );
    },
  },
};
</script>
<style lang="scss">
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}
</style>
