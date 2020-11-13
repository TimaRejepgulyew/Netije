<template>
  <main>
    <Header :headerTitle="$t('menu.registrationGroup')"></Header>
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.registrationGroup')"
      />
      <DxFilterRow :visible="true" />

      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="RegistrationGroup"
      />

      <DxEditing
        :allow-updating="$store.getters['permissions/IsAdmin']"
        :allow-deleting="$store.getters['permissions/IsAdmin']"
        :allow-adding="$store.getters['permissions/IsAdmin']"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="canRegisterOutgoing"
        :caption="$t('translations.fields.canRegisterOutgoing')"
        data-type="boolean"
      ></DxColumn>
      <DxColumn
        data-field="canRegisterIncoming"
        :caption="$t('translations.fields.canRegisterIncoming')"
        data-type="boolean"
      ></DxColumn>
      <DxColumn
        data-field="canRegisterInternal"
        :caption="$t('translations.fields.canRegisterInternal')"
        data-type="boolean"
      ></DxColumn>
      <DxColumn
        data-field="canRegisterContractual"
        :caption="$t('translations.fields.canRegisterContractual')"
        data-type="boolean"
      ></DxColumn>

      <DxColumn
        :visible-index="0"
        data-field="name"
        :caption="$t('shared.name')"
        data-type="string"
      >
        <DxRequiredRule :message="$t('shared.nameRequired')" />
      </DxColumn>
      <DxColumn
        :visible-index="1"
        :customizeText="customizeText"
        data-field="responsibleEmployee"
        :caption="$t('docFlow.fields.responsibleId')"
        editCellTemplate="responsibleEmployee"
      >
        <!-- <DxLookup
          :allow-clearing="true"
          :data-source="getActiveEmployees"
          value-expr="id"
          display-expr="name"
        /> -->
      </DxColumn>
      <template #responsibleEmployee="{ data: cellInfo }">
        <employee-select-box
          :value="cellInfo.value"
          @valueChanged="value => onValueChanged(value, cellInfo)"
        />
      </template>
      <DxColumn
        :visible-index="2"
        data-field="index"
        :caption="$t('translations.fields.index')"
      >
        <DxRequiredRule :message="$t('translations.fields.indexRequired')" />
        <DxPatternRule
          :pattern="indexPattern"
          :message="$t('translations.fields.indexRule')"
        />
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

      <template #masterDetailTemplate="data">
        <member-list :data="data.data" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import MemberList from "~/components/docFlow/registration-group/master-detail-member-list";
import dataApi from "~/static/dataApi";
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
  DxPatternRule,
  DxRequiredRule,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    MemberList,
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
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    employeeSelectBox
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.RegistrationGroup,
        insertUrl: dataApi.docFlow.RegistrationGroup,
        updateUrl: dataApi.docFlow.RegistrationGroup,
        removeUrl: dataApi.docFlow.RegistrationGroup
      }),
      entityType: EntityType.RegistrationGroup,
      statusDataSource: this.$store.getters["status/status"](this),
      indexPattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    customizeText(e) {
      if (e.value) return e.value.name;
    },
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    getActiveEmployees(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        filter: options.data
          ? [
              "status",
              "=",
              Status.Active,
              "or",
              "responsibleEmployeeId",
              "=",
              options.data.responsibleEmployeeId
            ]
          : []
      };
    }
  }
};
</script>
