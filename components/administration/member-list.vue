<template>
  <main>
    <DxDataGrid
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @init-new-row="onInitNewRow"
    >
      >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />
      <DxEditing
        :allow-updating="false"
        :allow-deleting="!immutable"
        :allow-adding="!immutable"
        :useIcons="true"
        mode="row"
      />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.members')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="member-list" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="memberId" :caption="$t('translations.fields.name')">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="GetActiveRecipientsDataStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import {
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
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxRequiredRule
} from "devextreme-vue/data-grid";

export default {
  components: {
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
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxRequiredRule,
    DxStateStoring
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    let { id, immutable } = this.data.data;
    return {
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "memberId",
          insertUrl: dataApi.admin.RoleMembers,
          loadUrl: dataApi.admin.RoleMembers + id,
          removeUrl: dataApi.admin.RoleMembers + id
        }),
        paginate: true
      }),
      immutable
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.roleId = id;
    },
    GetActiveRecipientsDataStore(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
        }),
        filter: options.data ? ["status", "=", Status.Active] : []
      };
    }
  }
};
</script>
