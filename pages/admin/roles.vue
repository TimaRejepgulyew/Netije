<template>
  <main>
    <Header :isNew="false" :isbackButton="true" :headerTitle="$t('menu.roles')"></Header>
    <DxDataGrid
      id="gridContainer"
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @init-new-row="onInitNewRow"
      @row-updating="onRowUpdating"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport :enabled="true" :allow-export-selected-data="true" :file-name="$t('menu.roles')" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="roles" />

      <DxEditing
        :allow-updating="isCustom"
        :allow-deleting="isCustom"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('shared.name')" data-type="string">
        <DxRequiredRule :message="$t('shared.nameRequired')" />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>

      <DxColumn
        data-field="description"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>

      <DxMasterDetail :enabled="true" template="master-detail" />

      <template #master-detail="data">
        <member-list :data="data.data" />
      </template>
      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="value => onValueChanged(value, cellInfo.data)"
        ></textArea>
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import MemberList from "~/components/administration/master-detail-member-list";
import textArea from "~/components/page/textArea";
import Header from "~/components/page/page__header";
import {
  DxMasterDetail,
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxRequiredRule,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    MemberList,
    DxMasterDetail,
    textArea,
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxRequiredRule,
    DxScrolling,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.admin.Roles,
        insertUrl: dataApi.admin.Roles,
        updateUrl: dataApi.admin.Roles,
        removeUrl: dataApi.admin.Roles
      }),
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    isCustom(e) {
      return !e.row.data.isSystem;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  }
};
</script>
