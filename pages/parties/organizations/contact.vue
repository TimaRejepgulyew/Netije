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
      @init-new-row="initNewRow"
    >
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.contacts')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="Contact"
      />

      <DxEditing :useIcons="true" mode="form" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxColumn>

      <DxColumn
        data-field="companyId"
        :caption="$t('translations.menu.company')"
        :visible="true"
      >
        <DxLookup :data-source="getFilteredCompany" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        data-field="department"
        :caption="$t('translations.fields.department')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="jobTitle"
        :caption="$t('translations.fields.jobTitleId')"
        :visible="false"
      >
        <DxAsyncRule
          :message="$t('translations.fields.countryAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="phone"
        :caption="$t('translations.fields.phones')"
      ></DxColumn>

      <DxColumn data-field="fax" :caption="$t('translations.fields.fax')">
        <DxRequiredRule :message="$t('translations.fields.fax')" />
      </DxColumn>

      <DxColumn
        data-field="email"
        :caption="$t('translations.fields.email')"
      ></DxColumn>

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="homepage"
        :caption="$t('translations.fields.homepage')"
        :visible="false"
      ></DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :data-source="statusStores"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
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
  DxStateStoring
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
    DxStateStoring
  },
  data() {
    return {
      headerTitle: this.$t("translations.menu.contacts"),

      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Contact,
      }),

      statusStores: this.$store.getters["status/status"],

      companyStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
      }),

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      }
    };
  },
  methods: {
    getFilteredCompany(options) {
      return {
        store: this.companyStore,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.companyId]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CompanyDataFieldValueNotExists(
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
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
