<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="true" :isNew="false" />
    <DxDataGrid
      width="100%"
      id="gridContainer"
      ref="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="false"
      :errorRowEnabled="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :onRowDblClick="selectRule"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      @toolbar-preparing="onToolbarPreparing"
    >
      <DxSearchPanel position="after" :visible="true" />
      <DxEditing
        mode="form"
        :use-icons="true"
        :allow-adding="false"
        :allow-updating="false"
        :allow-deleting="true"
      />
      <DxColumn data-field="name" data-type="string" :caption="$t('shared.name')" />
      <DxColumn data-field="status" :caption="$t('shared.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxEditing,
  DxColumn,
  DxLookup,
  DxSearchPanel
} from "devextreme-vue/data-grid";
import Header from "~/components/page/page__header.vue";
import DataSource from "devextreme/data/data_source";

import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxLookup,
    DxSearchPanel,
    Header
  },
  data() {
    return {
      headerTitle: this.$t("companyStructure.company.visibilityRules"),
      statusDataSource: this.$store.getters["status/status"](this),
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.visibilityRule.rule,
          removeUrl: dataApi.visibilityRule.rule
        }),
        paginate: true,
        pageSize: 10
      }),
      editButtons: [
        {
          hint: "edit",
          icon: "edit",
          onClick: this.editRule
        },
        "delete"
      ]
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
            this.$router.push(
              `/company/organization-structure/visibility-rules/create`
            );
          }
        }
      });
    },
    selectRule(e) {
      this.$router.push(
        `/company/organization-structure/visibility-rules/${e.data.id}`
      );
    },
    editRule(e) {
      this.$router.push(
        `/company/organization-structure/visibility-rules/${e.row.data.id}`
      );
    }
  }
};
</script>