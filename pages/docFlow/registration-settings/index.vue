<template>
  <main>
    <DxPopup
      :visible.sync="currentNuberPopupOpen"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="400"
      :height="200"
      :title="$t('translations.fields.currentNumber')"
    >
      <div>
        <current-number-popup
          :documentRegisterId="selectedDocumentRegisterId"
          v-if="currentNuberPopupOpen"
          @hidePopup="hideCurrentNumberPopup"
        />
      </div>
    </DxPopup>

    <Header :headerTitle="$t('docFlow.regSetting.registrationSettings')"></Header>

    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :errorRowEnabled="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @toolbar-preparing="onToolbarPreparing($event)"
    >
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('translations.fields.documentRegistry')"
      />
      <DxFilterRow :visible="true" />

      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="DocumentRegistry" />

      <DxEditing
        :allow-deleting="allowDeleting"
        :allow-adding="$store.getters['permissions/allowCreating'](entityType)"
        :useIcons="true"
        mode="form"
      />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />

      <DxColumn
        data-field="name"
        :caption="$t('registrationSettings.fields.name')"
        data-type="string"
      ></DxColumn>

      <DxColumn data-field="priority" :caption="$t('registrationSettings.fields.priority')"></DxColumn>

      <DxColumn data-field="documentFlow" :caption="$t('shared.documentFlow')" data-type="string">
        <DxLookup
          :allow-clearing="true"
          :data-source="documentFlowDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn
        data-field="documentRegisterId"
        :caption="$t('registrationSettings.fields.documentRegister')"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="documentRegisterDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>

      <DxColumn data-field="settingType" :caption="$t('registrationSettings.fields.settingType')">
        <DxLookup
          :allow-clearing="true"
          :data-source="settingTypeDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn data-field="status" :caption="$t('shared.status')">
        <DxLookup
          :allow-clearing="true"
          :data-source="statusDataSource"
          value-expr="id"
          display-expr="status"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton icon="more" :text="$t('shared.more')" :onClick="showDocumentRegisterEditForm"></DxButton>
        <DxButton icon="trash" name="delete"></DxButton>
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import SettingTypes from "~/infrastructure/stores/settingTypes.js"
import EntityType from "~/infrastructure/constants/entityTypes";
import CurrentNumberPopup from "~/components/docFlow/document-registry/current-number-popup";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
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
    CurrentNumberPopup
  },
  data() {
    return {
      entityType: EntityType.RegistrationSetting,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.RegistrationSetting,
        removeUrl: dataApi.docFlow.RegistrationSetting
      }),
      documentFlowDataSource: this.$store.getters["docflow/docflow"](this),
      settingTypeDataSource: SettingTypes.GetAll(this),
      statusDataSource: this.$store.getters["status/status"](this),
      documentRegisterDataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.DocumentRegistry
        }),
        paginate: true
      }
    };
  },
  methods: {
    canUpdate(e) {
      return this.canOperateWithDocumentRegister(e.row.data, "allowUpdating");
    },
    allowDeleting(e) {
      return this.canOperateWithDocumentRegister(e.row.data, "allowDeleting");
    },
    canOperateWithDocumentRegister(documentRegister, permission) {
      const employeeId = this.$store.getters["permissions/employeeId"];
      if (this.$store.getters["permissions/IsAdmin"]) return true;

      return this.$store.getters[`permissions/${permission}`](this.entityType);
    },
    showCurrentNumberPopup(e) {
      this.selectedDocumentRegisterId = e.row.key;
      this.currentNuberPopupOpen = true;
    },
    hideCurrentNumberPopup() {
      this.currentNuberPopupOpen = false;
    },
    showRegistrationSettingsForm(e) {
      this.$router.push(`/docflow/document-register/${e.row.data.id}`);
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.$router.push("/docflow/document-register/create");
        };
      }
    }
  }
};
</script>
