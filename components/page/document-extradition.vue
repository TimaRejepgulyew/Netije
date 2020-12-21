<template>
  <main class="pt-2">
    <DxButton :hint="$t('buttons.refresh')" class="refresh-btn" icon="refresh" :onClick="refresh"></DxButton>
    <DxDataGrid
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :read-only="true"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxScrolling mode="virtual" />
      <DxEditing mode="row" :allow-adding="true" :use-icons="true" :allow-updating="true" />
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
      <DxColumn
        data-field="deliveryTo.name"
        :caption="$t('documentTracking.fileds.deliveryToEmployee')"
      ></DxColumn>
      <DxColumn data-field="isOriginal" :caption="$t('documentTracking.fileds.isOriginal')"></DxColumn>
      <DxColumn
        data-type="date"
        data-field="deliveryDate"
        :caption="$t('documentTracking.fileds.deliveryDate')"
      ></DxColumn>
      <DxColumn
        data-type="date"
        data-field="returnDeadline"
        :caption="$t('documentTracking.fileds.returnDeadline')"
      ></DxColumn>
      <!-- <DxColumn data-field="returnResult" :caption="$t('documentTracking.fileds.returnResult')"></DxColumn> -->
      <DxColumn
        data-type="date"
        data-field="returnDate"
        :caption="$t('documentTracking.fileds.returnDate')"
      ></DxColumn>
      <DxColumn data-field="note" :caption="$t('documentTracking.fileds.note')"></DxColumn>
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
  DxStateStoring,
  DxLookup,
  DxEditing
} from "devextreme-vue/data-grid";
import Actions from "~/infrastructure/constants/historyActions.js";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";

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
    DxButton,
    DxEditing
  },
  props: ["id"],
  data() {
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.DocumentTracking.getDocumentTracking + this.id}`
        }),
        paginate: true,
        pageSize: 10
      }),
      editButtons: [
        {
          icon: "menu",
          onClick: this.updateExtradition
        }
      ]
    };
  },
  methods: {
    toolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$popup.documentExtradition(
            this,
            {
              documentId: this.id
            },
            {
              width: "30vw",
              height: "auto",
              showLoadingPanel: false
            }
          );
          //   console.log(123);
          //   this.$router.push("/docflow/document-kind/create");
        };
      }
    },
    updateExtradition(e) {
      this.$popup.documentExtradition(
        this,
        {
          documentId: this.id,
          isCard: true,
          currentExtradition: e.row.data
        },
        {
          width: "30vw",
          height: "auto",
          showLoadingPanel: false
        }
      );
    },
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
