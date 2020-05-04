<template>
  <main>
    <Header :headerTitle="$t('translations.menu.roles')"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="rowUpdating"
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
        :file-name="$t('translations.menu.roles')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="roles" />

      <DxEditing
        :allow-updating="isCustom"
        :allow-deleting="isCustom"
        :allow-adding="false"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusStores"
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
        <TabRole :data="data.data" memberList="Roles" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import dataApi from "~/static/dataApi";
import TabRole from "~/components/member-list/tabRole.vue";
import textArea from "~/components/page/textArea";
import Header from "~/components/page/page__header";
import {
  DxMasterDetail,
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    TabRole,
    DxMasterDetail,
    textArea,
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxSelection,
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
      isCustom: e => {
        return !e.row.data.isSystem;
      },
      statusStores: this.$store.getters["status/status"],
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  }
};
</script>
