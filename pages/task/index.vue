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
        :onRowDblClick="toMoreAbout"
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
        <DxColumn data-field="subject" :caption="$t('translations.fields.subject')"></DxColumn>
      </DxDataGrid>
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
          loadUrl: dataApi.task.Task
        }),
        filter: null
      }),
      statusStores: [
        { id: 0, name: this.$t("translations.fields.inProccess") },
        { id: 3, name: this.$t("translations.fields.completed") }
      ],
      assignmentsTypes: [
        {
          id: 0,
          path: "/task/createTask/2",
          name: this.$t("translations.fields.createSimpleTask")
        },
        {
          id: 2,
          path: "/task/createTask/action-execution",
          name: this.$t("translations.fields.createActionTask")
        },
        {
          id: 1,
          path: "/task/createTask/3",
          name: this.$t("translations.fields.createAcquaintanceTask")
        }
      ],
      employeeStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      })
    };
  },
  computed: {
    headerTitle() {
      return this.$t(`translations.menu.task`);
    }
  },
  methods: {
    onToolbarPreparing(header) {
      header.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: { icon: "undo", onClick: this.reloadGrid }
      });
    },
    reloadGrid() {
      this.store.reload();
    },
    toMoreAbout(e) {
      this.$router.push(`/task/moreAbout/task/${e.key}`);
    },
    onItemClick(e) {
      this.$router.push(e.itemData.path);
    },
    onRowPrepared(e) {
      this.showImportance(e);
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
        }
      }
    },
    showStatus(e) {
      if (e.data != undefined && e.data.status == 3) {
        e.rowElement.style.textDecoration = "line-through";
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
