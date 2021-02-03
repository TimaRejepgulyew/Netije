<template>
  <div>
    <Header :isbackButton="!isCard" :headerTitle="headerTitle" />
    <DxDataGrid
      id="gridContainer"
      ref="gridContainer"
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
      @rowDblClick="editRow"
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
      <DxColumn
        data-field="phrase"
        editCellTemplate="textArea"
        :caption="$t('companyStructure.additionally.phrase')"
        data-type="string"
      >
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="id" :visible="false"></DxColumn>
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
      <template #textArea="{ data: cellInfo }">
        <DxTextArea
          height="90px"
          :value="cellInfo.value"
          @valueChanged="(value) => onValueChanged(value, cellInfo)"
        />
      </template>
    </DxDataGrid>
    <div class="access_right_btn">
      <accessRight ref="accessRightBtn" :entityId="entityId" :entityType="entityType" />
    </div>
  </div>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import DxTextArea from "devextreme-vue/text-area";

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
  DxRequiredRule,
  DxButton
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import accessRight from "~/components/access-right/entity-access-right/access-right.vue";
import EntityType from "~/infrastructure/constants/entityTypes";

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
    DxRequiredRule,
    DxButton,
    DxTextArea,
    accessRight
  },
  props: {
    isCard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headerTitle: this.$t("companyStructure.additionally.phraseTemplates"),
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.phraseTemplate.phrase,
        insertUrl: dataApi.phraseTemplate.phrase,
        updateUrl: dataApi.phraseTemplate.phrase,
        removeUrl: dataApi.phraseTemplate.phrase
      }),
      entityType: EntityType.PhraseTemplate,
      entityId: null
    };
  },
  computed: {
    editButtons() {
      return [
        {
          icon: require("~/static/icons/access-right.svg"),
          width: "18px",
          height: "18px",
          onClick: this.openAcessRight
        },
        "edit",
        "delete"
      ];
    }
  },
  methods: {
    openAcessRight(e) {
      this.entityId = e.row.data.id;
      setTimeout(() => {
        this.$refs["accessRightBtn"].$el.click();
      }, 0);
    },
    editRow(e) {

      this.$refs["gridContainer"].instance.editRow(e.rowIndex);
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value.value);
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.access_right_btn {
  opacity: 0;
  width: 1px;
  height: 1px;
  position: absolute;
  z-index: -1;
}

#gridContainer {
  img {
    width: 18px;
    height: 18px;
  }
  .dx-row.dx-data-row.dx-column-lines {
    -webkit-user-select: none;
  }
  .dx-row.dx-data-row.dx-column-lines:hover {
    cursor: pointer;
    color: forestgreen;
  }
}
</style>
