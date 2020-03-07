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
      @row-updating="rowUpdating"
    >
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.departments')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Department" />

      <DxEditing
        :allow-updating="store.isSistem"
        :allow-deleting="store.isSistem"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
      <DxColumn
        data-field="employees"
        :caption="$t('translations.fields.employee')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
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
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton,
    Header
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.roles"),
      store: this.$dxStore({
        key: "id",
        loadUrl: `${dataApi.admin.Roles}/${this.$route.params.id}`,
        insertUrl: `${dataApi.admin.Roles}/${this.$route.params.id}`,
        updateUrl: `${dataApi.admin.Roles}/${this.$route.params.id}`,
        removeUrl: `${dataApi.admin.Roles}/${this.$route.params.id}`
      }),
      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      toCurrentRole: e => {
        this.$router.push("/admin/currentRole/" + e.row.data.id);
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
