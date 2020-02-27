<template>
  <main class="container container--grid">
    <h1 class="grid--title">{{ $t("translations.menu.employee") }}</h1>

    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @editing-start="editingStart"
      @init-new-row="initNewRow"
    >
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="false" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.businessUnit')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="BusinessUnit" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxEditing :allow-adding="true" :allow-updating="true" :useIcons="true" mode="inline" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn data-field="userName"></DxColumn>

      <DxColumn data-field="jobTitleId" :caption="$t('translations.fields.jobTitleId')"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')"></DxColumn>

      <DxColumn data-field="departmentId" :caption="$t('translations.fields.departmentId')" />

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')" />
    </DxDataGrid>
  </main>
</template>
<script>
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
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxPopup,
  DxButton
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
export default {
  components: {
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxSelection,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPopup,
    DxButton
  },
  created() {},
  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee,
        insertUrl: dataApi.company.Employee,
        updateUrl: dataApi.company.Employee,
        removeUrl: dataApi.company.Employee
      }),
      statusStores: this.$store.getters["status/status"],
      initNewRow: e => {
        this.$router.push("/company/staff/employees/addEmployee");
      },
      editingStart: e => {
        this.$router.push(
          `/company/staff/employees/updateEmployee/${e.data.id}`
        );
      }
    };
  },
  methods: {
    getFilteredEmployee(options) {
      return {
        store: this.employee,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.ceo]
          : null
      };
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
