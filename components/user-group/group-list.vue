<template>
  <main>
    <Header :isbackButton="!isCard" :headerTitle="headerTitle" />
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="selectEmployee"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxHeaderFilter :visible="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Employee" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxEditing
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="inline"
      />
      <DxColumn data-field="name" :caption="$t('shared.name')" data-type="string"></DxColumn>

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
  DxGrouping,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
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
    DxColumnChooser,
    DxColumnFixing,
    DxGrouping,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  props: {
    isCard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headerTitle: this.$t("companyStructure.additionally.group"),
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.userGroup.group,
        removeUrl: dataApi.userGroup.group
      }),
      editButtons: [
        {
          icon: "card",
          onClick: this.editEmployee
        },
        "delete"
      ]
    };
  },
  methods: {
    selectEmployee(e) {
      this.$router.push(`/company/user-group/${e.data.id}`);
    },
    editEmployee(e) {
      this.$router.push(`/company/user-group/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$router.push(`/company/user-group/create`);
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
  cursor: pointer;
  color: forestgreen;
}
</style>
