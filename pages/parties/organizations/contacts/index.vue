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
      @toolbar-preparing="onToolbarPreparing"
      @rowDblClick="rowDblClick"
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
      <DxEditing
        :useIcons="true"
        :allow-updating="allowUpdating"
        :allow-deleting="allowDeleting"
        :allow-adding="false"
      />
      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('parties.fields.contactName')" data-type="string" />

      <DxColumn data-field="companyId" :caption="$t('menu.company')">
        <DxLookup :data-source="companiesDataSource" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        data-field="department"
        :caption="$t('translations.fields.department')"
        :visible="false"
      />

      <DxColumn
        data-field="jobTitle"
        :caption="$t('translations.fields.jobTitleId')"
        :visible="false"
      />

      <DxColumn data-field="phone" :caption="$t('translations.fields.phones')" />

      <DxColumn data-field="fax" :caption="$t('parties.fields.fax')" />

      <DxColumn data-field="email" :caption="$t('translations.fields.email')" />

      <DxColumn
        data-field="homepage"
        :caption="$t('translations.fields.homepage')"
        :visible="false"
      />

      <DxColumn :caption="$t('counterPart.Person')" data-field="personId">
        <DxLookup :data-source="personIdDataSource" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusDataSource" value-expr="id" display-expr="status" />
      </DxColumn>

      <DxColumn data-field="note" :caption="$t('translations.fields.note')" :visible="false" />
      <DxColumn :width="110" :buttons="editButtons" type="buttons" />
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
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";

export default {
  components: {
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
      entityType: EntityType.Contact,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.Contact,
        removeUrl: dataApi.contragents.Contact
      }),
      personIdDataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.contragents.CounterPart
      }),
      companiesDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        filter: ["type", "<>", "Person"],
        paginate: true
      },
      editButtons: [
        {
          hint: "card",
          icon: "card",
          onClick: this.cardClick
        },
        {
          name: "delete"
        }
      ]
    };
  },
  computed: {
    statusDataSource() {
      return this.$store.getters["status/status"](this);
    },
    allowAdding() {
      return this.$store.getters["permissions/allowCreating"](this.entityType);
    },
    allowDeleting() {
      return this.$store.getters["permissions/allowDeleting"](this.entityType);
    },
    allowUpdating() {
      return this.$store.getters["permissions/allowUpdating"](this.entityType);
    }
  },
  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "plus",
          visible: this.allowAdding,
          onClick: () => {
            this.$router.push(`/parties/organizations/contacts/create`);
          }
        }
      });
    },
    cardClick(e) {
      this.editContact(e.row.data.id);
    },
    rowDblClick(e) {
      this.editContact(e.data.id);
    },
    editContact(id) {
      this.$router.push(`/parties/organizations/contacts/${id}`);
    }
  }
};
</script>

