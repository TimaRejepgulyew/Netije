<template>
  <main>
    <Header :headerTitle="headerTitle"></Header>
    <div class="nav-bar">
      <CreateTaskDropDown />
      <DxButton icon="filter" :text="$t('buttons.filter')" :on-click="showFilter" />
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
        :onRowDblClick="toMoreAbout"
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
          caption=""
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
          cellTemplate="cellTemplate"
          :visible="true"
          data-field="assignmentType"
        ></DxColumn>

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

        <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>

        <DxColumn
          :visible="false"
          data-field="isRead"
          sort-order="asc"
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
        <template #cellTemplate="cell">
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
import { DxDropDownButton } from "devextreme-vue";
import { DxCheckBox } from "devextreme-vue";
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
    DxCheckBox,
    DxButton,
    DxDropDownButton,
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
          loadUrl: dataApi.task.Assignments
        })
        // filter: JSON.parse(localStorage.getItem("filter")) || []
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
    }
  },
  methods: {
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
      this.showImportance(e);
      this.showNew(e);
      this.showStatus(e);
      this.showOfford(e);
    },
    showImportance(e) {
      if (e.data != undefined && e.data.importance == 0) {
        e.rowElement.bgColor = "lightBlue";
      }
    },
    showOfford(e) {
      if (e.data != undefined && e.data.status != 2) {
        if (e.data != undefined) {
          if (new Date(e.data.deadline) < new Date())
            e.rowElement.style.color = "#d9534f";
        }
      }
    },
    showStatus(e) {
      if (e.data != undefined && e.data.status == 2) {
        e.rowElement.style.textDecoration = "line-through";
      }
    },
    showNew(e) {
      if (e.data != undefined && !e.data.isRead) {
        e.rowElement.style.fontWeight = "bolder";
        e.rowElement.style.color = "#339966";
      }
    },
    changeFilter(filter) {
      console.log(filter);
      this.store = new DataSource({
        sort: "isRead",
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.assignment.Assignments
        }),
        filter: filter.filter
      });
    },
    toMoreAbout(e) {
      this.$router.push("/assignment/" + e.key);
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
        case 0:
        case 1:
        case 2:
        case 6:
        case 7:
        case 8:
          return require("~/static/icons/iconAssignment/assignment.svg");
        case 3:
        case 4:
        case 5:
        case 16:
        case 17:
          return require("~/static/icons/iconAssignment/notice.svg");
        default:
          return require("~/static/icons/iconAssignment/inProccess1.svg");
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
