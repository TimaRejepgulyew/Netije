<template>
  <main>
    <Header :headerTitle="$t(`menu.task`)"></Header>
    <div class="nav-bar">
      <CreateTaskDropDown />
    </div>
    <div class="grid">
      <DxDataGrid
        id="gridContainer"
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="false"
        :show-column-lines="false"
        :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
        :onRowDblClick="showTaskDetail"
        :on-row-prepared="onRowPrepared"
        @toolbar-preparing="onToolbarPreparing($event)"
        :focused-row-enabled="true"
      >
        <DxGroupPanel :visible="true" />
        <DxGrouping :auto-expand-all="false" />
        <DxHeaderFilter :visible="true" />

        <DxColumnChooser :enabled="true" />
        <DxColumnFixing :enabled="true" />

        <DxFilterRow :visible="true" />

        <DxExport :enabled="true" :allow-export-selected-data="true" :file-name="$t('menu.task')" />

        <DxStateStoring :enabled="true" type="localStorage" storage-key="task" />

        <DxEditing
          :allow-updating="false"
          :allow-deleting="false"
          :allow-adding="false"
          :useIcons="true"
          mode="form"
        />
        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />
        <DxColumn
          caption
          :allow-filtering="false"
          :allow-sorting="false"
          :allowResizing="false"
          :allowReordering="false"
          :allowHiding="false"
          :allowHeaderFiltering="false"
          :allowGrouping="false"
          :allowFixing="false"
          :allowExporting="false"
          alignment="center"
          :allowSearch="false"
          :width="60"
          cellTemplate="typeIcon"
          :visible="true"
          data-field="taskType"
        ></DxColumn>
        <DxColumn
          caption
          :allow-filtering="false"
          :allow-sorting="false"
          :allowResizing="false"
          :allowReordering="false"
          :allowHiding="false"
          :allowHeaderFiltering="false"
          :allowGrouping="false"
          :allowFixing="false"
          :allowExporting="false"
          alignment="center"
          :allowSearch="false"
          :width="40"
          cellTemplate="isImportant"
          :visible="true"
          data-field="importance"
        ></DxColumn>

        <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
        <DxColumn
          data-field="deadline"
          :caption="$t('translations.fields.deadLine')"
          data-type="date"
        />

        <DxColumn
          data-field="created"
          :caption="$t('translations.fields.createdDate')"
          data-type="date"
        />
        <DxColumn data-field="status" :caption="$t('translations.fields.status')">
          <DxLookup
            :allow-clearing="true"
            :data-source="statusDataSource"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>
        <template #isImportant="cell">
          <img class="icon--type" :src="cell.data.value|isImportant" />
        </template>
        <template #typeIcon="cell">
          <img class="icon--type" :src="cell.data.value|typeIcon" />
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import Important from "~/infrastructure/constants/assignmentImportance.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
import CreateTaskDropDown from "~/components/task/create-task-drop-down";
import { DxCheckBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import DxButton from "devextreme-vue/button";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxExport,
  DxSelection,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
    CreateTaskDropDown,
    DxCheckBox,
    DxButton,
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxSelection,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring
  },

  data() {
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.task.Task
        }),
        filter: null
      }),
      statusDataSource: [
        { id: 0, name: this.$t("translations.fields.inProccess") },
        { id: 3, name: this.$t("translations.fields.completed") }
      ]
    };
  },

  methods: {
    onToolbarPreparing(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: { icon: "refresh", onClick: this.reload }
      });
    },
    reload() {
      this.store.reload();
    },
    showTaskDetail({ data }) {
      this.$router.push(
        RouteGenerator.generateTaskDetailRoute(data.taskType, data.id)
      );
    },
    onRowPrepared(e) {
      this.addStatusStyle(e);
    },
    addStatusStyle(e) {
      if (e.data != undefined && e.data.status == 3) {
        e.rowElement.style.textDecoration = "line-through";
      }
    }
  },
  filters: {
    typeIcon(value) {
      switch (value) {
        case TaskType.AcquaintanceTask:
          return require("~/static/icons/status/acquiantance.svg");
        case TaskType.SimpleTask:
          return require("~/static/icons/status/simple.svg");
        case TaskType.ActionItemExecutionTask:
          return require("~/static/icons/status/actionItemExicution.svg");
        default:
          return require("~/static/icons/iconAssignment/inProccess1.svg");
      }
    },
    isImportant(value) {
      switch (value) {
        case Important.High:
          return require("~/static/icons/iconAssignment/important.svg");
      }
    }
  }
};
</script>
<style  scoped>
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>

