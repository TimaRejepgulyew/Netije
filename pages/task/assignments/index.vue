<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
    <div class="nav-bar">
      <DxDropDownButton
        :use-select-mode="false"
        :text="$t('translations.links.create')"
        :drop-down-options="{ width: 230 }"
        :items="assignmentsTypes"
        icon="plus"
        display-expr="name"
        @item-click="onItemClick"
      />
      <DxButton icon="filter" :text="$t('translations.links.filter')" :on-click="showFilter" />
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
        :onRowDblClick="toMoreAbout"
        :on-row-prepared="onRowPrepared"
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
          :file-name="$t('translations.menu.simpleAssignment')"
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
          data-type="string"
          data-field="assignmentType"
          :caption="$t('translations.fields.type')"
          cell-template="cellTemplate"
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
          data-field="isRead"
          sort-order="asc"
          :visible="false"
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
import TaskFilter from "~/components/task/filter";
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
          loadUrl: dataApi.task.AllAssignments + 0
        })
      }),
      iconStatus: ["inProccess.svg", "completed.svg"],
      assignmentsTypes: [
        {
          id: 0,
          path: "/task/createTask/simple",
          name: this.$t("translations.fields.createSimpleTask")
        },
        {
          id: 2,
          path: "/task/createTask/action-execution",
          name: this.$t("translations.fields.createActionTask")
        },
        {
          id: 1,
          path: "/task/createTask/acquaintance",
          name: this.$t("translations.fields.createAcquaintanceTask")
        }
      ],
      isFilterOpen: false,
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      })
    };
  },
  computed: {
    headerTitle() {
      return this.$t(`translations.menu.allAssignments`);
    }
  },
  methods: {
    onRowPrepared(e) {
      this.showImportance(e);
      this.showNew(e);
      this.showStatus(e);
      // this.showOfford(e);
    },
    showImportance(e) {
      if (e.data != undefined && e.data.importance == undefined) {
        e.rowElement.bgColor = "lightBlue";
      }
    },
    showOfford(e) {
      if (e.data != undefined && new Date(e.data.deadline) < new Date()) {
        e.rowElement.bgColor = "#FF6600";
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
    changeFilter({ assignmentType, filter }) {
      this.store = new DataSource({
        sort: "isRead",
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.task.AllAssignments + assignmentType
        }),
        filter: filter
      });
    },
    toMoreAbout(e) {
      const assignmentsTypes = [
        "all",
        "assignments",
        "simple",
        "acquaintance",
        "action-execution",
        "simple"
      ];
      this.$router.push(
        `/task/moreAbout/${assignmentsTypes[e.data.assignmentType]}/${e.key}`
      );
    },
    onItemClick(e) {
      this.$router.push(e.itemData.path);
    },
    showFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    }
  },
  filters: {
    typeIcon(value) {
      switch (value) {
        case 2:
          return require("~/static/icons/iconAssignment/assignment.svg");
          break;

        case 5:
          return require("~/static/icons/iconAssignment/notice.svg");
          break;

        default:
          return require("~/static/icons/iconAssignment/inProccess1.svg");
          break;
      }
    }
  }
};
</script>
<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
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
