
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { isNotification } from "~/infrastructure/constants/assignmentType.js";
import isImportantIcon from "~/components/page/task-important.vue";
import generatorPrefixByAssignmentType from "~/infrastructure/services/generatorPrefixByAssignmentType.js";
import AssignmentStatusGuid from "~/infrastructure/constants/assignmentStatus.js";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import { generateAssignmentQueryName } from "~/infrastructure/constants/assignmentQuery.js";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import TaskFilter from "~/components/assignment/filter";
import iconByAssignmentType from "~/components/assignment/icon-by-assignment-type.vue";
import AssignmentStatus from "~/infrastructure/models/AssignmentStatus.js";
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
export default {
  components: {
    TaskFilter,
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
    iconByAssignmentType,
    isImportantIcon,
    DxButtonGroup,
  },
  data() {
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl:
            dataApi.assignment.Assignments + (this.$route.params.type || 0),
        }),
        sort: [{ selector: "created", desc: true }],
      }),
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee,
      }),
      statusStore: Object.values(new AssignmentStatus(this).getAll()),
    };
  },
  computed: {
    assignmentTypes() {
      return new AssignmentType(this).withIconGroup();
    },
    headerTitle() {
      return generateAssignmentQueryName(+this.$route.params.type, this);
    },
  },
  methods: {
    setFilter(filter) {
      this.store = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.assignment.Assignments}${this.$route.params.type}?quickFilter=${filter}&`,
        }),
        paginate: true,
      });
    },
    // itemClick(e) {
    //   this.activeFilter = e.itemIndex;
    //   this.setStore(this.activeFilter);
    // },
    subjectText(rowData) {
      return (
        generatorPrefixByAssignmentType(rowData.assignmentType, this) +
        rowData.subject
      );
    },
    addButtonToGrid(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: { icon: "refresh", onClick: this.reload },
      });
    },
    reload() {
      this.store.reload();
    },
    showCompleteAssignment(style, data) {
      if (
        (!isNotification(data.assignmentType) &&
          data.status === AssignmentStatusGuid.Completed) ||
        data.status === AssignmentStatusGuid.Aborted
      ) {
        style.textDecoration = "line-through";
      }
    },
    onRowPrepared(e) {
      if (e.data != undefined) {
        if (!e.data.isRead) {
          e.rowElement.style.fontWeight = "bolder";
          e.rowElement.style.color = "#339966";
        }
        if (e.data.isExpired) {
          e.rowElement.style.color = "red";
        }
        this.showCompleteAssignment(e.rowElement.style, e.data);
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
    },
  },
};

