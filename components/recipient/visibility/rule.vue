<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="true" :isNew="false" />
    <DxDataGrid
      width="100%"
      id="gridContainer"
      ref="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="false"
      :errorRowEnabled="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="edit"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    ></DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel
} from "devextreme-vue/data-grid";
import Header from "~/components/page/page__header.vue";
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";
export default {
  components: {
    DxDataGrid,
    Header,
    RecipientTagBox
  },
  data() {
    return {
      headerTitle: this.$t("companyStructure.company.visibilityRules"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.CaseFile.All,
        insertUrl: dataApi.docFlow.CaseFile.Value,
        updateUrl: dataApi.docFlow.CaseFile.Value,
        removeUrl: dataApi.docFlow.CaseFile.Value
      })
    };
  },
  methods: {
    saveChanges(e) {
      console.log(e);
    }
  }
};
</script>