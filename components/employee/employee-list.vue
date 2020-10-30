<template>
  <main>
    <Header :isbackButton="!isCard" :headerTitle="$t('menu.employee')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="selectDocument"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxHeaderFilter :visible="true" />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.employee')"
      />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="Employee"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxEditing
        :allow-updating="
          $store.getters['permissions/allowUpdating'](entityType)
        "
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="inline"
      />

      <DxColumn
        data-field="name"
        :caption="$t('shared.name')"
        data-type="string"
      ></DxColumn>
      <DxColumn
        data-field="userName"
        :caption="$t('translations.fields.userName')"
        data-type="string"
      ></DxColumn>
      <DxColumn
        data-field="jobTitleId"
        :caption="$t('translations.fields.jobTitleId')"
      >
        <DxLookup
          :data-source="jobTitleDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        :visible="false"
        data-field="email"
        :caption="$t('translations.fields.email')"
      ></DxColumn>

      <DxColumn
        data-field="departmentId"
        :caption="$t('translations.fields.departmentId')"
      >
        <DxLookup
          :data-source="departmentsDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="phone"
        :caption="$t('translations.fields.phones')"
      />
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import DataSource from "devextreme/data/data_source";
import Header from "~/components/page/page__header";
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
  DxPopup,
  DxButton
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
export default {
  components: {
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxGrouping,
    DxGroupPanel,
    DxFilterRow,
    DxStateStoring,
    DxPopup,
    DxButton,
    DxLookup
  },
  props: ["isCard"],
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Employee,
        insertUrl: dataApi.company.Employee,
        updateUrl: dataApi.company.Employee,
        removeUrl: dataApi.company.Employee
      }),
      entityType: EntityType.Employee,
      statusDataSource: this.$store.getters["status/status"](this),
      departmentsDataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.Department
      }),
      jobTitleDataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.JobTitle
      }),
      editButtons: [
        {
          hint: "card",
          icon: "card",
          onClick: this.editEmployee
        }
      ]
    };
  },
  methods: {
    selectDocument(e) {
      this.$emit("selected", {
        id: e.key
      });
    },
    editEmployee(e) {
      this.$router.push(`/company/staff/employees/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$router.push(`/company/staff/employees/create`);
        };
      }
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}
</style>
