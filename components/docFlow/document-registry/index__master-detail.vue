<template>
  <main class="container container--grid">
    <DxPopup
      :visible.sync="popupSetting"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="800"
      :title="$t('translations.menu.registrationSetting')"
    >
      <div>
        <popup-reg-setting
          :id="registrationSettingId"
          v-if="popupSetting"
          @popupDisabled="popupDisabled('popupSetting')"
        />
      </div>
    </DxPopup>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
    >
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />
      <DxEditing :allow-updating="true" :allow-deleting="true" :useIcons="true" mode="form" />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.menu.contacts')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="DocumentRegister-detail" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn
        data-field="businessUnitId"
        :caption="$t('translations.menu.businessUnit')"
        :visible="true"
      >
        <DxLookup :data-source="bussinessUnitStores" value-expr="id" display-expr="name" />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="edit"
          :text="$t('translations.headers.editDocumentRegistry')"
          :onClick="editingStart"
        ></DxButton>
        <DxButton icon="trash" name="delete"></DxButton>
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import popupRegSetting from "~/components/docFlow/document-registry/popup-reg-setting";
import dataApi from "~/static/dataApi";
import { DxPopup } from "devextreme-vue/popup";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxEmailRule,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    popupRegSetting,
    DxPopup,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxEmailRule,
    DxButton
  },
  props: {
    documentRegistry: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let { name, id } = this.documentRegistry.data;
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.RegistrationSetting,
          updateUrl: dataApi.docFlow.RegistrationSetting,
          removeUrl: dataApi.docFlow.RegistrationSetting
        }),
        filter: ["documentRegisterId", "=", id]
      }),

      statusStores: this.$store.getters["status/status"],

      bussinessUnitStores: this.$dxStore({
        key: "id",
        loadUrl: dataApi.company.BusinessUnit
      }),
      popupSetting: false,
      editingStart: e => {
        console.log(e);
        this.registrationSettingId = e.row.key;
        this.popupSetting = true;
      },
      popupDisabled(popup) {
        this[popup] = false;
      }
    };
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.CompanyDataFieldValueNotExists(
        {
          id: params.data.id,
          [dataField]: params.value
        },
        dataField
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
