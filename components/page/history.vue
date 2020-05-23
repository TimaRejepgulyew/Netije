<template>
  <main class="pt-2">
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
      <DxColumn data-field="historyDate" data-type="date" :caption="$t('history.historyDate')"></DxColumn>
      <DxColumn data-field="userName" :caption="$t('history.userName')"></DxColumn>
      <DxColumn data-field="action" :caption="$t('history.action')"></DxColumn>
      <DxColumn data-field="hostName" :caption="$t('history.hostName')"></DxColumn>
      <DxColumn data-field="userAgent" :caption="$t('history.userAgent')"></DxColumn>
      <DxColumn data-field="comment" :caption="$t('history.comment')"></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
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
  DxStateStoring
} from "devextreme-vue/data-grid";

export default {
  components: {
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
    DxStateStoring
  },
  props: ["entityTypeGuid", "id"],
  data() {
    return {
      dataSource: [
        {
          id: 1,
          historyDate: "16.02.2018",
          userName: "igor",
          hostName: "Pushok",
          userAgent: "Google",
          action: "created",
          comment: "hello world"
        },
        {
          id: 1,
          historyDate: "16.02.2018",
          userName: "igor",
          hostName: "Pushok",
          userAgent: "Google",
          action: "created",
          comment: "hello world"
        }
      ]
      // dataSource: {
      //   store: this.$dxStore({
      //     key: "id",
      //     loadUrl: dataApi.History.GetHistoryById,

      //   }),
      // },
    };
  }
};
</script>
<style scoped>
.pt-2 {
  padding-top: 20px;
}
</style>