<template>
  <main class="container container--grid">
    <h1 class="grid--title">{{ $t("translations.menu.employee") }} {{password}}</h1>

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

      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :useIcons="true"
        mode="form"
      />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxColumn>

      <DxColumn :visible="false" data-field="userName">
        <DxRequiredRule :message="$t('translations.fields.userNameRequired')" />
      </DxColumn>

      <DxColumn data-field="jobTitleId" :caption="$t('translations.fields.jobTitleId')"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')">
        <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
        <DxEmailRule :message="$t('translations.fields.emailRule')" />
      </DxColumn>

      <DxColumn data-field="departmentId" :caption="$t('translations.fields.departmentId')" />

      <DxColumn
        data-field="password"
        :caption="$t('translations.fields.password')"
        :visible="false"
        :editor-options="passwordOptions"
        :allowEditing="false"
      >
        <DxRequiredRule :message="$t('translations.fields.passwordRequired')" />
      </DxColumn>

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')" />

      <DxColumn
        data-field="confirmPassword"
        :caption="$t('translations.fields.confirmPassword')"
        :visible="false"
        :editor-options="passwordOptions"
      >
        <DxCompareRule
          :comparison-target="passwordComparison"
          message="Password and Confirm Password do not match"
        />
        <DxRequiredRule :message="$t('translations.fields.confirmPasswordRequired')" />
      </DxColumn>
      <DxColumn data-field="note" :visible="false" :caption="$t('translations.fields.note')">
        <DxFormItem :col-span="2" :editor-options="{ height: 100 }" editor-type="dxTextArea" />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton icon="key" @click="showHideEditForm" />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import "devextreme-vue/text-area";
import dataApi from "~/static/dataApi";
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
  DxFormItem,
  DxEmailRule,
  DxCompareRule,
  DxForm,
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
    DxFormItem,
    DxEmailRule,
    DxCompareRule,
    DxForm,
    DxItem,
    DxPopup,
    DxButton
  },

  data() {
    return {
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee,
        insertUrl: dataApi.company.Employee,
        updateUrl: dataApi.company.Employee,
        removeUrl: dataApi.company.Employee
      }),

      passwordOptions: {
        mode: "password"
      },
      showEditForm: false,
      statusStores: this.$store.getters["status/status"],
      initNewRow: e => {
        this.$router.push("/company/staff/employees/addEmployee");
        e.data.status = this.statusStores[0].id;
      },

      rowUpdating: e => {
        e.newData = Object.assign(e.oldData, e.newData);
      },

      onRegionIdChanged(rowData, value) {
        rowData.localityId = null;
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    showHideEditForm() {
      this.showEditForm = !this.showEditForm;
    },
    passwordComparison() {
      console.log(this.store.Password);
      return this.store.Password;
    },

    getFilteredEmployee(options) {
      return {
        store: this.employee,
        filter: options.data
          ? ["status", "=", 0, "or", "id", "=", options.data.ceo]
          : null
      };
    },
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.BusinnesUnitDataFieldValueNotExists(
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
