<template>
  <main>
    <Header :headerTitle="headerTitle"></Header>
    <div class="nav-bar">
      <CreateTaskDropDown />
      <DxButton
        icon="filter"
        :text="$t('buttons.filter')"
        v-if="withFilter"
        :on-click="showFilter"
      />
    </div>
    <div class="grid">
      <DxDataGrid
        id="gridContainer"
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :hover-state-enabled="true"
        :column-auto-width="false"
        :show-column-lines="false"
        :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
        :onRowDblClick="showAssignment"
        :on-row-prepared="onRowPrepared"
        @toolbar-preparing="addButtonToGrid($event)"
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
          :file-name="$t('menu.simpleAssignment')"
        />

        <DxStateStoring :enabled="true" type="localStorage" storage-key="assignment" />

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
          data-field="assignmentType"
        ></DxColumn>
        <DxColumn
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
        <DxColumn
          data-field="subject"
          :calculate-cell-value="subjectText"
          :caption="$t('translations.fields.subject')"
        ></DxColumn>
        <DxColumn data-field="authorId" :caption="$t('translations.fields.authorId')">
          <DxLookup
            :allow-clearing="true"
            :data-source="employeeStores"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>
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
        <template #isImportant="cell">
          <img class="icon--type" :src="cell.data.value|isImportant" />
        </template>
        <template #typeIcon="cell">
          <img class="icon--type" :src="cell.data.value|typeIcon" />
        </template>
      </DxDataGrid>
      <transition name="fade">
        <aside class="sideBar" v-show="isFilterOpen">
          <TaskFilter @changeFilter="changeFilter" @showFilter="showFilter"></TaskFilter>
        </aside>
      </transition>
    </div>
  </main>
</template>
<script>
import AssignmentStatus from "~/infrastructure/constants/assignmentStatus.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import AssignmentTypeFilters from "~/infrastructure/constants/assignmentTypeFilters.js";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import TaskFilter from "~/components/assignment/filter";
import DxButton from "devextreme-vue/button";
import CreateTaskDropDown from "~/components/task/create-task-drop-down";
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
    TaskFilter,
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
          loadUrl:
            dataApi.assignment.Assignments + (this.$route.params.type || 0)
        }),
        sort: [{ selector: "created", desc: true }]
      }),
      isFilterOpen: false,
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      })
    };
  },
  computed: {
    headerTitle() {
      return this.$t(`menu.assignments`);
    },
    withFilter() {
      return +this.$route.params.type === AssignmentTypeFilters.all;
    }
  },
  methods: {
    subjectText(rowData) {
      let prefix = "";
      switch (rowData.assignmentType) {
        case AssignmentType.ActionItemSupervisorAssignment:
          prefix = this.$t("assignment.prefixes.actionItemSupervisorAssignment");
          break;
        case AssignmentType.ActionItemExecutionAssignment:
          prefix = this.$t("assignment.prefixes.actionItemExecutionAssignment");
          break;
        case AssignmentType.ActionItemExecutionNotification:
          prefix = this.$t("assignment.prefixes.actionItemExecutionNotification");
          break;
        case AssignmentType.AcquaintanceAssignment:
          prefix = this.$t("assignment.prefixes.acquaintanceAssignment");
          break;
        case AssignmentType.AcquaintanceNotification:
          prefix = this.$t("assignment.prefixes.acquaintanceNotification");
          break;
        case AssignmentType.AcquaintanceFinishAssignment:
          prefix = this.$t("assignment.prefixes.acquaintanceFinishAssignment");
          break;
        case AssignmentType.ActionItemObserversNotification:
          prefix = this.$t("assignment.prefixes.actionItemObserversNotification");
          break;
          default:
            break;
      }
      return prefix + rowData.subject;
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
    onRowPrepared(e) {
      if (e.data != undefined) {
        if (!e.data.isRead) {
          e.rowElement.style.fontWeight = "bolder";
          e.rowElement.style.color = "#339966";
        }
        if (e.data.isExpired) {
          e.rowElement.style.color = "red";
        }
        if (e.data.status == AssignmentStatus.Completed) {
          e.rowElement.style.textDecoration = "line-through";
        }
      }
    },
    changeFilter(filter) {
      if (this.withFilter) {
        this.store = new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.assignment.Assignments + this.$route.params.type
          }),
          sort: [{ selector: "created", desc: true }],
          filter: filter.filter.length>0?filter.filter:null
        });
      }
    },
    showAssignment(e) {
      this.$router.push("/assignment/more/" + e.key);
    },
    createTask(e) {
      this.$router.push(e.itemData.path);
    },
    showFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    }
  },
  filters: {
    typeIcon(value) {
      switch (value) {
        case AssignmentType.AcquaintanceAssignment:
          return require("~/static/icons/status/acquiantance.svg");
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
          return require("~/static/icons/iconAssignment/clock.svg");
        case 6:
        case 7:
        case 8:
          return require("~/static/icons/status/underreview.svg");
        case AssignmentType.SimpleNotify:
        case AssignmentType.ActionItemExecutionNotification:
        case AssignmentType.AcquaintanceNotification:
        case AssignmentType.ActionItemObserversNotification:
        case AssignmentType.ActionItemSupervisorNotification:
          return require("~/static/icons/iconAssignment/notice.svg");
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
<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.fade-enter,
.fade-leave-to {
  transform: translateX(30vw);
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}
.right {
  display: flex;
  justify-content: space-between;
  .filter__header {
    justify-self: flex-start;
  }
}
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>
