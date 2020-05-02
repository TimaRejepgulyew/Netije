<template>
  <main class="container container--grid">
    <Header :headerTitle="$t(`translations.menu.task`)"></Header>
    <div class="nav-bar">
      <CreateTaskDropDown />
    </div>
    <div class="grid">
      <DxDataGrid
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
      >
        <DxGroupPanel :visible="true" />
        <DxGrouping :auto-expand-all="false" />
        <DxHeaderFilter :visible="true" />

        <DxColumnChooser :enabled="true" />
        <DxColumnFixing :enabled="true" />

        <DxFilterRow :visible="true" />

        <DxExport
          :enabled="true"
          :allow-export-selected-data="true"
          :file-name="$t('translations.menu.task')"
        />

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
            :data-source="statusStores"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
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
      statusStores: [
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
    showTaskDetail(e) {
      this.$router.push(
        RouteGenerator.generateTaskDetailRoute(taskType, taskId)
      );
    },
    onRowPrepared(e) {
      this.addImportanceStyle(e);
      this.addStatusStyle(e);
    },
    addImportanceStyle(e) {
      if (e.data != undefined && e.data.importance == 0) {
        console.log(e.rowElement);
        e.rowElement.bgColor = "lightBlue";
      }
    },
    addStatusStyle(e) {
      if (e.data != undefined && e.data.status == 3) {
        e.rowElement.style.textDecoration = "line-through";
      }
    }
  }
};
</script>

