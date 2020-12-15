<template>
  <main>
    <Header
      :showTitle="!isCard"
      :headerTitle="$t('docFlow.automaticAssignmentRules.automaticAssignmentRulesTitle')"
      :isbackButton="!isCard"
    />
    <DxDataGrid
      @toolbar-preparing="onToolbarPreparing($event)"
      :onRowDblClick="toDetail"
      :data-source="store"
      :show-borders="true"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="false"
      :focused-row-enabled="false"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
    >
      <DxStateStoring :enabled="true" type="localStorage" storage-key="document-template" />
      <DxEditing :allow-adding="false" :allow-deleting="true" :useIcons="true" />
      <DxSearchPanel position="after" :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxScrolling mode="virtual" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('shared.documentTemplates')"
      />

      <DxColumn data-field="name" :caption="$t('docFlow.automaticAssignmentRules.fields.name')" />
    </DxDataGrid>
  </main>
</template>

<script>
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxExport,
  DxGrouping,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxGrouping,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    Header
  },
  props: {
    isCard: {
      type: Boolean
    }
  },
  data() {
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.accessRightRule.getAccessRightRule,
          removeUrl: dataApi.accessRightRule.getAccessRightRule
        }),
        paginate: true,
        pageSize: 10
      }),
      toDetail: e => {
        this.$emit("toDetail", {
          id: e.key
        });
      }
    };
  },
  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.store.reload();
          }
        }
      });
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "plus",
          onClick: () => {
            this.$router.push(`/docFlow/automatic-assignment-rules/detail`);
          }
        }
      });
    }
  }
};
</script>