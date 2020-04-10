<template>
  <main class="container container--grid">
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :on-row-inserted="(e) => e.component.navigateToRow(e.key)"
      @row-updating="rowUpdating"
      @init-new-row="initNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.registrationGroup')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="RegistrationGroup" />

      <DxEditing
        :allow-updating="$store.getters['permissions/allowUpdating'](entityType)"
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="canRegisterOutgoing"
        :caption="$t('translations.fields.canRegisterOutgoing')"
        data-type="boolean"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="index" :caption="$t('translations.fields.index')">
        <DxPatternRule :pattern="indexPattern" :message="$t('translations.fields.indexRule')" />
        <DxAsyncRule
          :message="$t('translations.fields.indexAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn
        data-field="canRegisterInternal"
        :caption="$t('translations.fields.canRegisterInternal')"
        data-type="boolean"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="responsibleEmployeeId"
        :caption="$t('translations.fields.responsibleId')"
        :visible="false"
      >
        <DxRequiredRule :message="$t('translations.fields.responsibleIdRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="employeeStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="canRegisterIncoming"
        :caption="$t('translations.fields.canRegisterIncoming')"
        data-type="boolean"
        :visible="false"
      ></DxColumn>

      <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

      <template #masterDetailTemplate="membersList">
        <masterDetailMembersList :membersList="membersList.data" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import masterDetailMembersList from "~/components/docFlow/registration-group/master-detail-members-list";
import dataApi from "~/static/dataApi";
import CustomStore from "devextreme/data/custom_store";
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
  DxPatternRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    masterDetailMembersList,
    DxMasterDetail,
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
    DxPatternRule,
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
      headerTitle: this.$t("translations.menu.registrationGroup"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.RegistrationGroup,
        insertUrl: dataApi.docFlow.RegistrationGroup,
        updateUrl: dataApi.docFlow.RegistrationGroup,
        removeUrl: dataApi.docFlow.RegistrationGroup
      }),
      entityType: "RegistrationGroup",
      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        e.data.status = this.statusStores[0].id;
      },
      employeeStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee
      }),

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },
      indexPattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    getFilteredEmployee(options) {
      return {
        store: this.employeeStore,
        filter: options.data ? ["id", "=", options.data.employeeId] : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.RegistrationGroupDataFieldValueNotExists(
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
.container {
  display: block;
}
</style>
