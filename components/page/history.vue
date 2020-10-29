<template>
  <main class="pt-2">
    <DxButton
      :hint="$t('buttons.refresh')"
      class="refresh-btn"
      icon="refresh"
      :onClick="refresh"
    ></DxButton>
    <DxDataGrid
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :read-only="true"
    >
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        sort-order="desc"
        data-field="historyDate"
        data-type="datetime"
        :caption="$t('history.historyDate')"
      ></DxColumn>
      <DxColumn data-field="user" :caption="$t('history.userName')"></DxColumn>
      <DxColumn data-field="action" :caption="$t('history.action')">
        <DxLookup
          :allow-clearing="true"
          :data-source="actions"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="version"
        :caption="$t('history.version')"
      ></DxColumn>
      <DxColumn
        data-field="hostName"
        :caption="$t('history.hostName')"
      ></DxColumn>
      <DxColumn
        data-field="userAgent"
        :caption="$t('history.userAgent')"
      ></DxColumn>
      <DxColumn
        data-field="comment"
        :caption="$t('history.comment')"
      ></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Actions from "~/infrastructure/constants/historyActions.js";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxScrolling,
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxLookup
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxLookup,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxHeaderFilter,
    DxScrolling,
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  props: ["entityTypeGuid", "id"],
  data() {
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.History}${this.entityTypeGuid}/${this.id}`
        }),
        paginate: true,
        pageSize: 10
      }),

      actions: Actions(this)
    };
  },
  methods: {
    refresh() {
      this.dataSource.reload();
    }
  }
};
</script>
<style scoped>
.pt-2 {
  padding-top: 20px;
}
</style>
