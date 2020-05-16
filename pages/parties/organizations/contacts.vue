<template>
  <main>
    <Header :headerTitle="$t('menu.contacts')"></Header>
    <DxDataGrid
      id="gridContainer"      
      :show-borders="true"
      :errorRowEnabled="false"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @row-updating="onRowUpdating"
      @init-new-row="onInitNewRow"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('menu.contacts')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Contact" />

      <DxEditing :useIcons="true" mode="form" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.contactName')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxColumn>

      <DxColumn data-field="companyId" :caption="$t('menu.company')" :visible="true">
        <DxRequiredRule :message="$t('translations.fields.companyRequired')" />
        <DxLookup
          :allow-clearing="true"
          :data-source="companiesDataSource"
          value-expr="id"
          display-expr="name"
        />
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
      </DxColumn>

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')"></DxColumn>

      <DxColumn data-field="fax" :caption="$t('translations.fields.fax')"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')">
        <DxEmailRule :message="$t('translations.fields.emailRule')" />
      </DxColumn>

      <DxColumn
        data-field="homepage"
        :caption="$t('translations.fields.homepage')"
        :visible="false"
      ></DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>

      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
        edit-cell-template="textAreaEditor"
      ></DxColumn>

      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="value => onValueChanged(value, cellInfo.data)"
        ></textArea>
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
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
  DxRequiredRule,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxEmailRule
} from "devextreme-vue/data-grid";

export default {
  components: {
    textArea,
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
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxEmailRule
  },
  data() {
    return {
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Contact
      }),
      companiesDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        filter:["type","<>","Person"],
        paginate: true
      },
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  }
};
</script>

