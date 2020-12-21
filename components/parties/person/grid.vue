<template>
  <main>
    <Header :headerTitle="$t('menu.person')"></Header>
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
        :file-name="$t('parties.fields.person')"
      />

      <DxStateStoring
        :enabled="$store.getters['permissions/allowReading'](entityType)"
        type="localStorage"
        storage-key="Person"
      />

      <DxEditing
        :allow-updating="true"
        :allow-deleting="(e)=>allowDeleting(e)"
        :allow-adding="false"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn
        data-field="firstName"
        :caption="$t('translations.fields.firstName')"
        data-type="string"
      ></DxColumn>

      <DxColumn
        data-field="lastName"
        :caption="$t('translations.fields.lastName')"
        data-type="string"
      ></DxColumn>
      <DxColumn
        data-field="middleName"
        :caption="$t('translations.fields.middleName')"
        data-type="string"
      ></DxColumn>

      <DxColumn
        data-field="dateOfBirth"
        :caption="$t('translations.fields.dateOfBirth')"
        data-type="date"
      ></DxColumn>

      <DxColumn data-field="phones" :caption="$t('translations.fields.phones')"></DxColumn>

      <DxColumn data-field="email" :caption="$t('translations.fields.email')"></DxColumn>

      <DxColumn data-field="webSite" :caption="$t('translations.fields.webSite')" :visible="false"></DxColumn>

      <DxColumn
        data-field="sex"
        :caption="$t('translations.fields.sex')"
        data-type="string"
        :visible="false"
      >
        <DxLookup :allow-clearing="true" :data-source="sex" value-expr="id" display-expr="name"></DxLookup>
      </DxColumn>

      <DxColumn data-field="tin" :caption="$t('translations.fields.tin')"></DxColumn>

      <DxColumn data-field="code" :caption="$t('shared.code')" :visible="false"></DxColumn>

      <DxColumn data-field="regionId" :caption="$t('translations.fields.regionId')">
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
        data-field="nonresident"
        :visible="false"
        data-type="boolean"
        :caption="$t('translations.fields.nonresident')"
      ></DxColumn>

      <DxColumn data-field="account" :caption="$t('translations.fields.account')" :visible="false"></DxColumn>

      <DxColumn data-field="bankId" :caption="$t('translations.fields.bankId')" :visible="false">
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
      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false"></DxColumn>
      <DxColumn :buttons="editButtons" type="buttons" />
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
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Person,
        insertUrl: dataApi.contragents.Person,
        updateUrl: dataApi.contragents.Person,
        removeUrl: dataApi.contragents.Person
      }),
      entityType: EntityType.Counterparty,
      statusDataSource: this.$store.getters["status/status"](this),
      bankStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Bank
      }),
      sex: [
        { id: 0, name: this.$t("sex.male") },
        { id: 1, name: this.$t("sex.female") }
      ],
      editButtons: [
        {
          name: "edit",
          onClick: this.selected
        },
        {
          name: "delete"
        }
      ]
    };
  },
  methods: {
    selected(e) {
      const id = e.key || e.row.key;
      this.$emit("selected", { id, type: "person" });
    },
    allowDeleting(e) {
      return (
        this.$store.getters["permissions/allowDeleting"](this.entityType) &&
        !e.row.data.isSystem
      );
    },
    createCounterPart() {
      this.$emit("create", { type: "person" });
    }
  }
};
</script>
