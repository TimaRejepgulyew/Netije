import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import importanceIconColumn from "~/components/page/task-important.vue";
import Important from "../../../infrastructure/constants/taskImportance.js";

import AssignmentType from "../../../infrastructure/models/AssignmentType";
import { isNotification } from "../../../infrastructure/constants/assignmentType";
import AssignmentStatusGuid from "../../../infrastructure/constants/assignmentStatus";
import { generateAssignmentQueryName } from "../../../infrastructure/constants/query/assignmentQuery";
import assignnmentTypeIconColumn from "../../grid-components/icon-by-assignment-type.vue";

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
  DxPaging
} from "devextreme-vue/data-grid";
export default {
  components: {
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
    DxPaging,
    assignnmentTypeIconColumn,
    importanceIconColumn,
    toolbarItemQuickFilter: () =>
      import("../../grid-components/quickFilter.vue")
  },
  props: ["assignmentQuery"],
  data() {
    return {
      store: null
    };
  },
  computed: {
    assignmentTypes() {
      return new AssignmentType(this).withIconGroup();
    },
    headerTitle() {
      return generateAssignmentQueryName(this.assignmentQuery, this);
    }
  },
  methods: {
    setStore(quickFilter, filter) {
      console.log(filter);
      this.store = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.assignment.Assignments}${this.assignmentQuery}/${quickFilter}`
        }),
        filter,
        sort: [{ selector: "created", desc: true }]
      });
    },
    addButtonToGrid(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: { icon: "refresh", onClick: this.reload }
      });
    },
    reload() {
      this.store.reload();
    },
    showCompleteAssignment(data, style) {
      if (
        (!isNotification(data.assignmentType) &&
          data.status === AssignmentStatusGuid.Completed) ||
        data.status === AssignmentStatusGuid.Aborted
      ) {
        style.textDecoration = "line-through";
      }
    },
    showIsNotReadAssignment({ isRead, status, assignmentType }, style) {
      if (
        !isRead &&
        status !== AssignmentStatusGuid.Aborted &&
        (status !== AssignmentStatusGuid.Completed ||
          isNotification(assignmentType))
      ) {
        style.fontWeight = "bolder";
      }
    },
    showExipiredAssignmnet({ isExpired }, style) {
      if (isExpired) {
        style.color = "red";
      }
    },
    onRowPrepared(e) {
      if (e.data != undefined) {
        this.showIsNotReadAssignment(e.data, e.rowElement.style);
        this.showExipiredAssignmnet(e.data, e.rowElement.style);
        this.showCompleteAssignment(e.data, e.rowElement.style);
      }
    },

    showAssignment(e) {
      this.$router.push("/assignment/more/" + e.key);
    },
    showFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    isImportant(value) {
      switch (value) {
        case Important.High:
          return require("~/static/icons/iconAssignment/important.svg");
      }
    }
  }
};
