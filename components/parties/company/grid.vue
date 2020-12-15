<template>
  <main>
    <Header :headerTitle="$t('menu.companies')"></Header>

    <DxDataGrid
      id="gridContainer"
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="selected"
      @toolbar-preparing="onToolbarPreparing($event)"
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
        :file-name="$t('parties.fields.company')"
      />

      <DxStateStoring
        :enabled="$store.getters['permissions/allowReading'](entityType)"
        type="localStorage"
        storage-key="Company"
      />

      <DxEditing
        :allow-updating="false"
        :allow-deleting="e => allowDeleting(e)"
        :allow-adding="false"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />

      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('shared.name')"
        data-type="string"
      >
      </DxColumn>

      <DxColumn
        data-field="headCompanyId"
        :caption="$t('parties.fields.headCompanyId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="dataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="legalName"
        :caption="$t('translations.fields.legalName')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="tin"
        :caption="$t('translations.fields.tin')"
        :visible="true"
      >
      </DxColumn>
      <DxColumn
        data-field="phones"
        :caption="$t('translations.fields.phones')"
      ></DxColumn>
      <DxColumn data-field="email" :caption="$t('translations.fields.email')">
      </DxColumn>
      <DxColumn data-field="code" :caption="$t('shared.code')" :visible="false">
      </DxColumn>

      <DxColumn
        data-field="regionId"
        :caption="$t('translations.fields.regionId')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="regionStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="localityId"
        :caption="$t('translations.fields.localityId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="localityStore"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn
        data-field="legalAddress"
        :caption="$t('translations.fields.legalAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="postAddress"
        :caption="$t('translations.fields.postAddress')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="webSite"
        :caption="$t('translations.fields.webSite')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="nonresident"
        :caption="$t('translations.fields.nonresident')"
        :visible="false"
        data-type="boolean"
      ></DxColumn>

      <DxColumn
        data-field="account"
        :caption="$t('translations.fields.account')"
        :visible="false"
      ></DxColumn>

      <DxColumn
        data-field="bankId"
        :caption="$t('translations.fields.bankId')"
        :visible="false"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="bankStore"
          value-expr="id"
          display-expr="name"
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
      <DxColumn
        data-type="boolean"
        data-field="canExchange"
        :caption="$t('parties.fields.canExchange')"
        :visible="true"
      ></DxColumn>
      <DxColumn
        data-field="note"
        :caption="$t('translations.fields.note')"
        :visible="false"
      ></DxColumn>

      <DxMasterDetail
        :enabled="$store.getters['permissions/allowReading'](contactEntityType)"
        template="masterDetailTemplate"
      />

      <template #masterDetailTemplate="company">
        <master-detail-contacts :company="company.data" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
import partiesGridMixin from "~/mixins/parties.vue/parties-grid.js";
export default {
  mixins: [partiesGridMixin],
  data() {
    return {
      contactEntityType: EntityType.Contact,
      entityType: EntityType.Counterparty,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Company,
        insertUrl: dataApi.contragents.Company,
        updateUrl: dataApi.contragents.Company,
        removeUrl: dataApi.contragents.Company
      }),
      bankStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Bank
      }),
      statusDataSource: this.$store.getters["status/status"](this)
    };
  },
  methods: {
    selected({ key: id }) {
      this.$emit("selected", { id, type: "company" });
    },
    createCounterPart() {
      this.$emit("create", { type: "company" });
    }
  }
};
</script>
