<template>
  <main class="pt-2">
    <DxDataGrid
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      height="65vh"
      :read-only="true"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxPaging :enabled="false" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxEditing mode="row" :allow-adding="true" :use-icons="true" :allow-updating="true" />
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
      <DxColumn
        data-field="deliveryTo"
        :caption="$t('documentTracking.fileds.deliveryToEmployee')"
        cellTemplate="deliveryToId"
      ></DxColumn>
      <template #deliveryToId="{ data: cellInfo }">
        <employee-select-box
          v-if="cellInfo.value"
          valueExpr="id"
          displayExpr="name"
          :readOnly="true"
          :value="cellInfo.value.id"
        ></employee-select-box>
      </template>
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
  DxEditing,
  DxPaging
} from "devextreme-vue/data-grid";
import Actions from "~/infrastructure/constants/historyActions.js";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";

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
    DxEditing,
    DxPaging,
    employeeSelectBox
  },
  props: ["id"],
  data() {
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.DocumentTracking.getDocumentTracking + this.id}`,
          paginate: false
        })
      }),
      editButtons: [
        {
          icon: "menu",
          onClick: this.updateDocumentTracking
        }
      ]
    };
  },
  methods: {
    toolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          hint: this.$t("buttons.refresh"),
          icon: "refresh",
          onClick: this.refresh
        }
      });
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$popup.documentTracking(
            this,
            {
              documentId: this.id
            },
            {
              width: "30vw",
              height: "auto",
              showLoadingPanel: false,
              listeners: [
                { eventName: "valueChanged", handlerName: "valueChanged" }
              ]
            }
          );
          //   console.log(123);
          //   this.$router.push("/docflow/document-kind/create");
        };
      }
    },
    updateDocumentTracking(e) {
      this.$popup.documentTracking(
        this,
        {
          documentId: this.id,
          isCard: true,
          currentDocumentTracking: e.row.data
        },
        {
          width: "30vw",
          height: "auto",
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" }
          ]
        }
      );
    },
    valueChanged() {
      this.refresh();
    },
    refresh() {
      this.dataSource.reload();
    }
  }
};
</script>
<style lang="scss">
.pt-2 {
  padding-top: 20px;
  .dx-datagrid
    .dx-datagrid-content
    .dx-datagrid-table
    .dx-row
    .dx-command-edit-with-icons
    .dx-link {
    width: 18px;
    height: 18px;
    background-position: 0 0;
    background-size: 18px 18px;
    padding: 0;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
  }
}
</style>
