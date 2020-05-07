<template>
  <main>
    <Header :headerTitle="$t(`translations.menu.contacts`)"></Header>
    <DxDataGrid
      id="gridContainer"      
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
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
        :file-name="$t('translations.menu.contacts')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="Contact-detail" />

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
      </DxColumn>
      <DxColumn
        data-field="companyId"
        :caption="$t('translations.fields.company')"
        :visible="false"
        :allow-editing="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="getActiveCompanies"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="department"
        :caption="$t('translations.fields.department')"
        :visible="false"
      ></DxColumn>

      <DxColumn data-field="jobTitle" :caption="$t('translations.fields.jobTitleId')"></DxColumn>

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')"></DxColumn>

      <DxColumn data-field="fax" :caption="$t('translations.fields.fax')" :visible="false"></DxColumn>

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
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import textArea from "~/components/page/textArea";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
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
    Header,
    textArea,
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
  props: {
    company: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let { id } = this.company.data;
    return {
      dataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.Contact,
          insertUrl: dataApi.contragents.Contact,
          updateUrl: dataApi.contragents.Contact,
          removeUrl: dataApi.contragents.Contact
        }),
        filter: ["companyId", "=", id]
      },
      entityType: EntityType.Contact,
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    onInitNewRow(e) {
      e.data.companyId = this.company.data.id;
      e.data.status = this.statusDataSource[Status.Active].id;
    },
    onRowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    getActiveCompanies(options) {
      return {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        paginate: true,
        filter: options.data
          ? [
              "status",
              "=",
              Status.Active,
              "or",
              "id",
              "=",
              options.data.companyId
            ]
          : []
      };
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  }
};
</script>