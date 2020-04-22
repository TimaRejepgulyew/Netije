<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="rowUpdating"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxSelection mode="multiple" />
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
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
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
        <TabRole :data="data.data" />
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
import dataApi from "~/static/dataApi";

// import MasterDetail from "~/components/administration/tab-role";
import TabRole from "~/components/administration/tabRole.vue";
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
  DxAsyncRule,
  DxRequiredRule,
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
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  data() {
    const entityType = "";
    return {
      headerTitle: this.$t("translations.menu.roles"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.admin.Roles,
        insertUrl: dataApi.admin.Roles,
        updateUrl: dataApi.admin.Roles,
        removeUrl: dataApi.admin.Roles
      }),
      isCustom: e => {
        if (!e.row.data.isSystem) {
          return this.$store.getters["permissions/allowUpdating"](
            this.entityType
          );
        }
        return !e.row.data.isSystem;
      },
      statusStores: this.$store.getters["status/status"],
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredHeadOffice(options) {
      return {
        store: this.headOfficeStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.headOfficeId]
          : null
      };
    },

    getFilteredManager(options) {
      return {
        store: this.managerStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.managerId]
          : null
      };
    },
    getFilteredBussinessUnit(options) {
      return {
        store: this.businessUnitStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.businessUnitId]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.DepartmentDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  }
};
</script>
<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
