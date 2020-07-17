<template>
  <main>
    <Header :isbackButton="true" :headerTitle="headerTitle"></Header>
    <div class="nav-bar">
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
          <is-important-icon v-if="cell.data.value" :state="cell.data.value" />
        </template>
        <template #typeIcon="cell">
          <icon-by-assignment-type class="icon--type" :assignmentType="cell.data.value" />
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
import isImportantIcon from "~/components/page/task-important.vue";
import generatorPrefixByAssignmentType from "~/infrastructure/services/generatorPrefixByAssignmentType.js";
import AssignmentStatus from "~/infrastructure/constants/assignmentStatus.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import AssignmentQuery, {
  generateAssignmentQueryName
} from "~/infrastructure/constants/assignmentQuery.js";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import TaskFilter from "~/components/assignment/filter";
import DxButton from "devextreme-vue/button";
import iconByAssignmentType from "~/components/assignment/icon-by-assignment-type.vue";
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
    DxStateStoring,
    iconByAssignmentType,
    isImportantIcon
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
      return generateAssignmentQueryName(+this.$route.params.type, this);
    },
    withFilter() {
      return +this.$route.params.type === AssignmentQuery.All;
    }
  },
  methods: {
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
          filter: filter.filter.length > 0 ? filter.filter : null
        });
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
</script>
<style lang="scss" scoped >
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
  height: 20px;
  width: 100%;
}
</style>
