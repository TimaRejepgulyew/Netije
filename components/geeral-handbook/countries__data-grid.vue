<template>
  <main class="container">
    <div>
      <!-- <DxDataGrid
        id="gridContainer"
        :data-source="dataSource"
        :allow-column-reordering="true"
        :show-borders="true"
        key-expr="ID"
        @editing-start="logEvent('EditingStart')"
        @init-new-row="logEvent('InitNewRow')"
        @row-inserting="logEvent('RowInserting')"
        @row-inserted="logEvent('RowInserted')"
        @row-updating="logEvent('RowUpdating')"
        @row-updated="logEvent('RowUpdated')"
        @row-removing="logEvent('RowRemoving')"
        @row-removed="logEvent('RowRemoved')"
      >-->
      <DxDataGrid
        :show-borders="true"
        :data-source="dataSource"
        :remote-operations="true"
        :height="600"
      >
        <DxHeaderFilter :visible="true" />
        <!-- <DxPaging :enabled="true" /> -->
        <DxEditing :allow-updating="true" :allow-deleting="true" :allow-adding="true" mode="row" />
        <DxSearchPanel position="after" :visible="true" />
        <DxScrolling mode="virtual" />

        <DxColumn data-field="id" caption="Id" />
        <DxColumn data-field="name" />
        <DxColumn data-field="status" />
        <DxColumn :width="130" data-field="userId" />
        <DxColumn :width="125" data-field="phone" caption="State" />
        <!-- <DxLookup :data-source="states" display-expr="Name" value-expr="ID" /> -->
        <!-- </DxColumn> -->
        <!-- <DxColumn :width="125" data-field="BirthDate" data-type="date" /> -->
      </DxDataGrid>
    </div>
  </main>
</template>
<script>
// import TTDocStore from "../TTDocStore.js";
// import { createStore } from "devextreme-aspnet-data-nojquery";
import { employees, states } from "~/static/data-user.js";
import CustomStore from "devextreme/data/custom_store";
import oidc from "~/plugins/oidc-plugin.js";
// import DxButton from "devextreme-vue/button";
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

// let options = createStore({
//   key: "id",
//   loadUrl: `http://192.168.4.99/api/Employee`,
// });

let dataSource;

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

  data() {
    return {
      dataSource
    };
  },
  methods: {
    configureDataSource() {
      var test = this.$store.dispatch("TTDocStore/CreateStore", options);
      console.log("Finish dispatch") 
    }
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