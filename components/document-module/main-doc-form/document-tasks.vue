<template>
  <main>
    <DxPopup
      :showTitle="false"
      :visible.sync="isOpenTaskCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="90%"
      :height="'95%'"
    >
      <div class="scrool-auto">
        <card-task
          v-if="isOpenTaskCard"
          :taskId="currentTaskCardId"
          @onClose="toggleTaskCard"
          :isCard="true"
        />
      </div>
    </DxPopup>

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
        :load-panel="{
          enabled: true,
          indicatorSrc: require('~/static/icons/loading.gif')
        }"
        :onRowDblClick="showCard"
        :on-row-prepared="onRowPrepared"
        @toolbar-preparing="onToolbarPreparing($event)"
        :focused-row-enabled="false"
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
          :file-name="$t('task.taskQuery.all')"
        />

        <DxStateStoring
          :enabled="true"
          type="localStorage"
          :storage-key="'documentTasks' + documentId"
        />

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
          data-field="taskType"
        ></DxColumn>
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
          :width="40"
          cellTemplate="isImportant"
          :visible="true"
          data-field="importance"
        ></DxColumn>

        <DxColumn
          data-field="subject"
          :caption="$t('task.fields.subjectTask')"
        ></DxColumn>

        <DxColumn
          data-field="maxDeadline"
          :caption="$t('task.fields.deadLine')"
          data-type="date"
        />

        <DxColumn
          data-field="created"
          :caption="$t('task.fields.createdDate')"
          sort-order="desc"
          data-type="date"
        />
        <DxColumn
          data-field="author.name"
          :caption="$t('task.fields.author')"
          :allowHeaderFiltering="false"
          data-type="string"
        />

        <DxColumn
          data-field="status"
          :caption="$t('translations.fields.status')"
        >
          <DxLookup
            :allow-clearing="true"
            :data-source="statusDataSource"
            value-expr="id"
            display-expr="text"
          />
        </DxColumn>
        <template #isImportant="cell">
          <task-importace-component :state="cell.data.value" />
        </template>
        <template #typeIcon="cell">
          <task-icon :taskTypeGuid="cell.data.value" />
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import { DxPopup } from "devextreme-vue/popup";
import cardTask from "~/components/task/index.vue";
import { load } from "~/infrastructure/services/taskService.js";
import taskStoreMixin from "~/mixins/task/taskСategories.js";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
export default {
  components: {
    cardTask,
    DxPopup
  },
  props: ["documentId", "isCard"],
  mixins: [taskStoreMixin],
  data() {
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.task.GetTasksByDocument + this.documentId
        }),
        paginate: true,
        pageSize: 10
      }),
      currentTaskCardId: null,
      isOpenTaskCard: false
    };
  },
  methods: {
    toggleTaskCard() {
      this.isOpenTaskCard = !this.isOpenTaskCard;
    },
    async showCard({ data }) {
      await load(this, { taskType: data.taskType, taskId: data.id });
      this.currentTaskCardId = data.id;
      this.toggleTaskCard();
    }
  }
};
</script>
<style lang="scss" scoped>
#gridContainer {
  max-height: 70vh;
}
#gridContainer .dx-data-row {
  -webkit-user-select: none;
}
#gridContainer .dx-data-row:hover {
  color: forestgreen;
}
</style>
