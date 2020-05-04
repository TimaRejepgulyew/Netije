<template>
  <main >
    <DxPopup
      :visible.sync="popupSetting"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="600"
      :height="500"
      :title="$t('translations.menu.registrationSetting')"
    >
      <div>
        <popup-reg-setting
          :documentRegisterId="documentRegisterId"
          v-if="popupSetting"
          @popupDisabled="popupDisabled('popupSetting')"
        />
      </div>
    </DxPopup>

    <DxPopup
      :visible.sync="popupCurrentNumber"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="400"
      :height="200"
      :title="$t('translations.fields.currentNumber')"
    >
      <div>
        <popup-current-number
          :documentRegisterId="documentRegisterId"
          v-if="popupCurrentNumber"
          @popupDisabled="popupDisabled('popupCurrentNumber')"
        />
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
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @init-new-row="initNewRow"
      :ref="dataGridRefKey"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
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

      <DxEditing
        :allow-deleting="$store.getters['permissions/allowDeleting'](entityType)"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn data-field="index" :caption="$t('translations.fields.index')"></DxColumn>

      <DxColumn
        data-field="documentFlow"
        :caption="$t('translations.fields.documentFlow')"
        data-type="string"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="documentFlow"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="tips"
          :text="$t('translations.fields.currentNumber')"
          :onClick="currentNumberStart"
        ></DxButton>

        <DxButton
          icon="edit"
          :text="$t('translations.headers.editDocumentRegistry')"
          :onClick="editingStart"
          :visible="$store.getters['permissions/allowUpdating'](entityType)"
        ></DxButton>

        <DxButton
          :visible="$store.getters['permissions/allowCreating'](entityType2)"
          icon="plus"
          :text="$t('translations.headers.addRegistrationSetting')"
          :onClick="settingStart"
        ></DxButton>

        <DxButton icon="trash" name="delete"></DxButton>
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('translations.fields.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusStores"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>

      <DxMasterDetail :enabled="true" template="masterDetailTemplate" />

      <template #masterDetailTemplate="documentRegistry">
        <RegSettingDetail :documentRegistry="documentRegistry.data" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import popupRegSetting from "~/components/docFlow/document-registry/popup-reg-setting";
import popupCurrentNumber from "~/components/docFlow/document-registry/popup-current-number";
import RegSettingDetail from "~/components/docFlow/document-registry/index__master-detail";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import CustomStore from "devextreme/data/custom_store";
import Header from "~/components/page/page__header";
import { DxPopup } from "devextreme-vue/popup";
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
    DxMasterDetail,
    RegSettingDetail,
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
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxPopup,
    DxButton,

    popupCurrentNumber,
    popupRegSetting
  },
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
      dataGridRefKey: "dataGrid",
      documentFlow: [
        { id: 0, name: this.$t("translations.fields.incomingEnum") },
        { id: 1, name: this.$t("translations.fields.outcomingEnum") },
        { id: 2, name: this.$t("translations.fields.inner") },
        { id: 3, name: this.$t("translations.fields.contracts") }
      ],
      entityType: "DocumentRegister",
      entityType2: "RegistrationSetting",

      statusStores: this.$store.getters["status/status"],

      initNewRow: e => {
        this.$router.push("/docFlow/document-registration/form/newDocRegistry");
      },
      editingStart: e => {
        this.$router.push(
          "/docFlow/document-registration/form/" + e.row.data.id
        );
      },
      popupCurrentNumber: false,
      currentNumberStart: e => {
        this.documentRegisterId = e.row.key;
        this.popupCurrentNumber = true;
      },
      documentRegisterId: null,
      popupSetting: false,
      isRegistrationSetting: e => {
        const status = e.row.data.status;
        if (status == 0) {
          return true;
        } else {
          return false;
        }
      },
      regSettingFilter: null
    };
  },
  computed: {
    dataGrid: function() {
      return this.$refs[this.dataGridRefKey].instance;
    }
  },
  methods: {
    settingStart(e) {
      this.documentRegisterId = e.row.key;
      this.popupSetting = true;
    },
    popupDisabled(popup) {
      this.dataGrid.refresh();
      this[popup] = false;
    }
  }
};
</script>
