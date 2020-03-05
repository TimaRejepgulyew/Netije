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
        <popup-reg-setting @popupDisabled="popupDisabled('popupVisible')" />
      </div>
    </DxPopup>
    <Header :headerTitle="headerTitle"></Header>
    <DxDataGrid
      :show-borders="true"
      :data-source="store"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      @init-new-row="initNewRow"
    >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.documentRegistry')"
      />
      <DxFilterRow :visible="true" />
      <DxSelection mode="multiple" />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="DocumentRegistry" />

      <DxEditing :allow-deleting="true" :allow-adding="true" :useIcons="true" mode="form" />

      <DxSearchPanel
        position="after"
        :placeholder="$t('translations.fields.search') + '...'"
        :visible="true"
      />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string">
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        <DxAsyncRule
          :message="$t('translations.fields.nameAlreadyAxists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
      </DxColumn>

      <DxColumn data-field="index" :caption="$t('translations.fields.index')">
        <DxRequiredRule :message="$t('translations.fields.indexRequired')" />
      </DxColumn>

      <DxColumn
        data-field="documentFlow"
        :caption="$t('translations.fields.documentFlow')"
        data-type="string"
      >
        <DxLookup :data-source="documentFlow" value-expr="id" display-expr="name" />
      </DxColumn>

      <!--
      <DxColumn
        data-field="registerType"
        :caption="$t('translations.fields.registerType')"
        data-type="string"
      >
      </DxColumn>-->

      <DxColumn type="buttons">
        <DxButton icon="tips" :text="$t('translations.fields.moreAbout')"></DxButton>
        <DxButton icon="edit" :text="$t('translations.fields.moreAbout')" :onClick="editingStart"></DxButton>
        <DxButton icon="plus" :text="$t('translations.fields.moreAbout')" :onClick="settingStart"></DxButton>
        <DxButton icon="trash" :text="$t('translations.fields.moreAbout')" name="delete"></DxButton>
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup :data-source="statusStores" value-expr="id" display-expr="status" />
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import popupRegSetting from "~/components/docFlow/document-registry/popup-reg-setting";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import CustomStore from "devextreme/data/custom_store";
import Header from "~/components/page/page__header";
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
  DxButton
} from "devextreme-vue/data-grid";

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
    DxRequiredRule,
    DxAsyncRule,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPopup,
    DxButton,
    popupRegSetting
  },
  mounted() {},
  data() {
    return {
      headerTitle: this.$t("translations.menu.documentRegistry"),
      store: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentRegistry,
        insertUrl: dataApi.docFlow.DocumentRegistry,
        updateUrl: dataApi.docFlow.DocumentRegistry,
        removeUrl: dataApi.docFlow.DocumentRegistry
      }),
      popupVisible: false,
      popupOpt: {
        onClick: () => {
          this.popupVisible = true;
        },
        height: 50,
        icon: "plus"
      },
      documentFlow: [
        { id: 0, name: this.$t("translations.fields.incomingEnum") },
        { id: 1, name: this.$t("translations.fields.outcomingEnum") },
        { id: 2, name: this.$t("translations.fields.inner") },
        { id: 3, name: this.$t("translations.fields.contracts") }
      ],

      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        this.$router.push("/docFlow/document-registration/form/newDocRegistry");
      },

      editingStart: e => {
        this.$router.push(
          "/docFlow/document-registration/form/" + e.row.data.id
        );
      },
      popupSetting: false,
      settingStart: e => {
        this.popupSetting = true;
      }
    };
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.column.dataField;
      return this.$customValidator.DocumentRegistrationDataFieldValueNotExists(
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
.container {
  display: block;
}
</style>
