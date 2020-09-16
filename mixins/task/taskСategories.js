import taskImportaceComponent from "~/components/page/task-important.vue";
import taskIcon from "~/components/page/task-icon.vue";
import { DxCheckBox } from "devextreme-vue";
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
  DxStateStoring,
} from "devextreme-vue/data-grid";
import taskStatus, { taskStatusGeneratorObj } from "~/infrastructure/constants/taskStatus.js";
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
    taskImportaceComponent,
  },
  data() {
    return {
      statusDataSource: [...Object.values(taskStatusGeneratorObj(this))],
    };
  },
  methods: {
    onToolbarPreparing(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: { icon: "refresh", onClick: this.reload },
      });
    },
    reload() {
      this.store.reload();
    },
    toDetail({ data }) {
      this.$router.push(`/task/detail/${data.taskType}/${data.id}`);
    },
    onRowPrepared(e) {
      if (e.data != undefined) {
        this.showCompletedTask(e.data, e.rowElement.style);
        this.showDraftTask(e.data, e.rowElement.style)
      }
    },
    showCompletedTask(data, style) {
      if (data.status == taskStatus.Completed) {
        style.textDecoration = "line-through";
      }
    },
    showDraftTask(data, style) {
      if (data.status == taskStatus.Draft) {
        style.fontStyle = "italic";
      }
    }
  },
}
