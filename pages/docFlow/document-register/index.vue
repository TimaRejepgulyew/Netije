<template>
  <main>
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
          :documentRegisterId="selectedDocumentRegisterId"
          v-if="popupCurrentNumber"
          @popupDisabled="popupDisabled('popupCurrentNumber')"
        />
      </div>
    </DxPopup>

    <Header :headerTitle="$t('translations.menu.documentRegistry')"></Header>

    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :errorRowEnabled="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      @toolbar-preparing="onToolbarPreparing($event)"
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

      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn data-field="index" :caption="$t('translations.fields.index')"></DxColumn>

      <DxColumn
        data-field="documentFlow"
        :caption="$t('translations.fields.documentFlow')"
        data-type="string"
      >
        <DxLookup
          :allow-clearing="true"
          :data-source="documentFlowDataSource"
          value-expr="id"
          display-expr="name"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="orderedlist"
          :text="$t('translations.fields.currentNumber')"
          :visible="canUpdate"
          :onClick="showCurrentNumberPopup"
        ></DxButton>

        <DxButton
          icon="card"
          :onClick="showDocumentRegisterEditForm"
        ></DxButton>

        <DxButton icon="trash" name="delete"></DxButton>
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

      <template v-if="canUpdate" #masterDetailTemplate="documentRegistry">
        <RegSettingDetail :documentRegistry="documentRegistry.data" />
      </template>
    </DxDataGrid>
  </main>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import popupCurrentNumber from "~/components/docFlow/document-registry/popup-current-number";
import RegSettingDetail from "~/components/docFlow/document-registry/index__master-detail";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
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
    popupCurrentNumber
  },
  data() {
    return {
      entityType: EntityType.DocumentRegister,
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.docFlow.DocumentRegistry,
        removeUrl: dataApi.docFlow.DocumentRegistry
      }),
      dataGridRefKey: "dataGrid",
      documentFlowDataSource: this.$store.getters["docflow/docflow"](this),
      statusDataSource: this.$store.getters["status/status"](this),
      popupCurrentNumber: false,
      selectedDocumentRegisterId: null
    };
  },
  computed: {
    dataGrid: function() {
      return this.$refs[this.dataGridRefKey].instance;
    }
  },
  methods: {
    canUpdate(e)
    {
      return this.canOperateWithDocumentRegister(e.row.data,"allowUpdating")
    },
    allowDeleting(e) {
      return this.canOperateWithDocumentRegister(e.row.data,"allowDeleting")
    },
    canOperateWithDocumentRegister(documentRegister,permission)
    {
      const employeeId = this.$store.getters["permissions/employeeId"];
      if(this.$store.getters['permissions/IsAdmin'])
          return true;
       if (!this.$store.getters[`permissions/${permission}`](this.entityType))
          return false;
       if (documentRegister.documentRegisterResponsibleId == employeeId || !documentRegister.documentRegisterResponsibleId)
          return true;
      return false;
    },
    showCurrentNumberPopup(e) {
      this.selectedDocumentRegisterId = e.row.key;
      this.popupCurrentNumber = true;
    },
    popupDisabled(popup) {
      this[popup] = false;
    },
    showDocumentRegisterEditForm(e) {
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
