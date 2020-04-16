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
        :column-auto-width="true"
        :show-column-lines="false"
        :onRowDblClick="toMoreAbout"
      >
        <DxGroupPanel :visible="true" />
        <DxGrouping :auto-expand-all="false" />
        <DxSelection mode="multiple" />
        <DxHeaderFilter :visible="true" />

        <DxColumnChooser :enabled="true" />
        <DxColumnFixing :enabled="true" />

        <DxFilterRow :visible="true" />

        <DxExport
          :enabled="true"
          :allow-export-selected-data="true"
          :file-name="$t('translations.menu.simpleAssignment')"
        />

        <DxStateStoring :enabled="true" type="localStorage" storage-key="simpleAssignment" />

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

        <DxColumn data-field="authorId" :caption="$t('translations.fields.authorId')">
          <DxLookup
            :allow-clearing="true"
            :data-source="employeeStores"
            value-expr="id"
            display-expr="name"
          />
        </DxColumn>

        <!-- <DxColumn
            data-field="taskId"
            :caption="$t('translations.fields.taskId')"
            data-type="selectbox"
          >
            <DxLookup
              :allow-clearing="true"
              :data-source="documentKindStores"
              value-expr="id"
              display-expr="name"
            />
        </DxColumn>-->
      </DxDataGrid>
      <transition name="fade">
        <aside class="sideBar" v-if="isFilterOpen">
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
      assignmentType: this.$route.params.type,

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
      // documentKindStores: this.$dxStore({
      //   key: "id",
      //   loadUrl: dataApi.docFlow.DocumentKind
      // })
    };
  },
  computed: {
    headerTitle() {
      console.log(this.store);
      const assignmentsTypes = [
        "all",
        "allAssignments",
        "simpleAssignments",
        "acquaintanceAssignments",
        "actionAssignments",
        "allNotice"
      ];

      return this.$t(
        `translations.menu.${assignmentsTypes[this.assignmentType]}`
      );
    },

    store() {
      const assignmentType = this.assignmentType;
      console.log("request", assignmentType);
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.task.AllAssignments + this.assignmentType
        }),
        filter: this.filter
      });
    }
  },
  methods: {
    changeFilter({ assignmentType, filter }) {
      this.assignmentType = assignmentType;
      this.filter = filter;
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
      console.log(this.isFilterOpen);
      this.isFilterOpen = !this.isFilterOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
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
.sideBar {
  border: 1px solid darken($base-bg, 5);
  height: 100%;
  padding: 20px;
  background: $base-bg;
  position: absolute;
  right: 0;
  top: 0;
  max-width: 300px;
  width: 100%;
  z-index: 2;
  -webkit-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  -moz-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  .filter__header {
    font-size: 24px;
  }
  .filter__content {
    padding: 20px 0;
    .option--group {
      padding: 10px 0;
      .option__title {
        padding: 10px 0;
      }
      .option {
        padding: 10px 10px;
      }
    }
  }
}
</style>
