<template>
  <main>
    <Header :isbackButton="true" :headerTitle="headerTitle">
      <toolbar-item-quick-filter slot="toolbar" @setFilter="setFilter" :key="+$route.params.type" />
    </Header>
    <div class="grid">
      <DxDataGrid
        :columns="assignmentDataGridColums"
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
        <DxColumn data-field="status" :caption="$t('translations.fields.status')">
          <DxLookup
            :allow-clearing="true"
            :data-source="statusStore"
            value-expr="id"
            display-expr="text"
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
        <template #importanceIconColumn="cell">
          <is-important-icon v-if="cell.data.value" :state="cell.data.value" />
        </template>
        <template #assignnmentTypeIconColumn="cell">
          <icon-by-assignment-type
            class="icon--type"
            :assignmentType="cell.data.value"
            :assignmentTypes="assignmentTypes"
          />
        </template>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import assignmentMixin from "~/mixins/assignment/assignmentGridTemplateMixin.js";
export default {
  mixins: ["assignmentMixin"],
};
</script>
<style  scoped>
.icon--type {
  display: flex;
  margin: 0 auto;
  height: 20px;
  width: 100%;
}
</style>
