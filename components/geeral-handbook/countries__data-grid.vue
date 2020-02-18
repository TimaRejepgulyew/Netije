<template>
  <main class="container">
    <div>
      <DxDataGrid
        :show-borders="true"
        :data-source="store"
        :remote-operations="true"
        :height="600"
        @row-updating="rowUpdating"
      >
        <DxHeaderFilter :visible="true" />
        <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" />
        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn data-field="name" alignment="left" data-type="string" />

        <DxColumn 
        data-field="status"
        >
          <DxLookup 
          :data-source="customStores" 
          value-expr="id" 
          display-expr="status"
          /> 
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
  mounted() {
    this.store = this.$dxStore({
      key: "id",
      loadUrl: "http://192.168.4.99/api/Country",
      insertUrl: "http://192.168.4.99/api/Country",
      updateUrl: "http://192.168.4.99/api/Country",
      removeUrl: "http://192.168.4.99/api/Country"
    });

    this.customStores = [
      { id: 0, status: "Активна" },
      { id: 1, status: "Закрыта" }
    ];
  },
  data() {
    return {
      store: null,
      customStores: null,

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData)
      },
    };
  },
  methods: {}
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