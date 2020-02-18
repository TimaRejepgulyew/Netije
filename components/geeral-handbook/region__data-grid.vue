<template>
  <main class="container">
    <div>
      <DxDataGrid
        :show-borders="true"
        :data-source="dataStore"
        :remote-operations="true"
        @row-updating="rowUpdating"
        @init-new-row="initNewRow"
      >
        <DxHeaderFilter :visible="true" />

        <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" />

        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn data-field="name" />

        <DxColumn data-field="countryId" caption="Country" >
          <DxLookup :data-source="getFilteredStatus" value-expr="id" display-expr="name"/>
        </DxColumn>

        <DxColumn data-field="status">
          <DxLookup :data-source="Status" value-expr="id" display-expr="status" />
        </DxColumn>
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import oidc from "~/plugins/oidc-plugin.js";
import {
  DxSearchPanel,
  // DxButton,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxGrouping,
  DxScrolling,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat
} from "devextreme-vue/data-grid";

export default {
  middleware: "authorization",
  components: {
    DxSearchPanel,
    // DxButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxFilterRow,
    DxHeaderFilter,
    DxGroupPanel,
    DxGrouping,
    DxScrolling,
    DxSummary,
    DxLookup,
    DxTotalItem,
    DxGroupItem,
    DxMasterDetail,
    DxStringLengthRule,
    DxRequiredRule,
    DxRangeRule,
    DxValueFormat
  },
  mounted() {},
  data() {
    return {
      dataStore: this.$dxStore({
        loadUrl: "http://192.168.4.99/api/Region",
        insertUrl: "http://192.168.4.99/api/Region",
        updateUrl: "http://192.168.4.99/api/Region",
        removeUrl: "http://192.168.4.99/api/Region"
      }),
      Status: [
        { id: 0, status: "Активна" },
        { id: 1, status: "Закрыта" }
      ],
      countrySource: this.$dxStore({
        loadUrl: "http://192.168.4.99/api/Country"
      }),
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      initNewRow: e => {
        e.data.status = this.Status[0].id;
      }
    };
  },
  methods: {
    getFilteredStatus(options){
      return {
        store: this.countrySource,
        filter: options.data ? ['status', '=', 0] : null
      };
    },
  }
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
</style>