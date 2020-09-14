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
import { taskStatusGeneratorObj } from "~/infrastructure/constants/taskStatus.js";
import DataSource from "devextreme/data/data_source";
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
      employeeDataSoure:new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee,
        }),
      }),
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
      this.showCompletedTask(e);
    },
    showCompletedTask(e) {
      if (e.data != undefined && e.data.status == 3) {
        e.rowElement.style.textDecoration = "line-through";
      }
    },
  },
}
