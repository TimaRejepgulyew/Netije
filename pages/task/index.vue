<template>
  <main>
    <Header  :isbackButton="true" :headerTitle="$t(`menu.task`)"></Header>
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
        :focused-row-enabled="false"
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
          sort-order="desc"
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
          <task-important :state="cell.data.value" />
        </template>
        <template #typeIcon="cell">
          <task-icon :taskTypeGuid="cell.data.value" />
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import taskImportant from "~/components/page/task-important.vue";
import taskIcon from "~/components/page/task-icon.vue";
import TaskStatus from "~/infrastructure/constants/taskStatus.js";
import RouteGenerator from "~/infrastructure/routing/routeGenerator";
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
    DxStateStoring,
    taskIcon,
    taskImportant
  },

  data() {
    return {
      store: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.task.Task
        })
      },
      statusDataSource: [
        {
          id: TaskStatus.Draft,
          name: this.$t("translations.fields.draft")
        },
        {
          id: TaskStatus.InProcess,
          name: this.$t("translations.fields.inProccess")
        },
        {
          id: TaskStatus.Completed,
          name: this.$t("translations.fields.completed")
        },
        {
          id: TaskStatus.Aborted,
          name: this.$t("translations.fields.aborted")
        },
        {
          id: TaskStatus.UnderReview,
          name: this.$t("translations.fields.underReview")
        }
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
      this.$store.commit("currentTask/IS_NEW", false);
      this.$router.push(`task/detail/${data.taskType}/${data.id}`);
    },
    onRowPrepared(e) {
      this.addStatusStyle(e);
    },
    addStatusStyle(e) {
      if (e.data != undefined && e.data.status == 3) {
        e.rowElement.style.textDecoration = "line-through";
      }
    }
  }
};
</script>
<style >
#gridContainer .dx-data-row {
  -webkit-user-select: none;
}
#gridContainer .dx-data-row:hover {
  color: forestgreen;
}
</style>

