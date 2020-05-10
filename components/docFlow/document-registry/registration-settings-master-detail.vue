<template>
  <main>
    <Header :headerTitle="$t(`menu.registrationSetting`)"></Header>
    <DxPopup
      :visible.sync="popupFormOpen"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="600"
      :height="480"
      :title="$t('menu.registrationSetting')"
    >
      <div>
        <popup-reg-setting
          :documentRegisterId="documentRegisterId"
          :id="regSettingId"
          v-if="popupFormOpen"
          @hidePopup="hidePopup"
        />
      </div>
    </DxPopup>

    <DxDataGrid
      id="gridContainer"
      :errorRowEnabled="false"
      :show-borders="true"
      :data-source="dataSource"
      :remote-operations="true"
      :allow-column-reordering="false"
      :allow-column-resizing="false"
      :column-auto-width="true"
      @toolbar-preparing="onToolbarPreparing($event)"
      :load-panel="{enabled:true, indicatorSrc:require('~/static/icons/loading.gif')}"
      :ref="dataGridRefKey"
    >
      <DxEditing
        :allow-adding="allowAdding"
        :allow-updating="allowUpdating"
        :allow-deleting="allowDeleting"
        :useIcons="true"
        mode="form"
      />
      <DxColumn data-field="name" :caption="$t('translations.fields.name')" data-type="string"></DxColumn>

      <DxColumn type="buttons">
        <DxButton
          icon="edit"
          :text="$t('translations.headers.editDocumentRegistry')"
          :onClick="showPopupForm"
        ></DxButton>
        <DxButton icon="trash" name="delete"></DxButton>
      </DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import Header from "~/components/page/page__header";
import popupRegSetting from "~/components/docFlow/document-registry/popup-reg-setting";
import dataApi from "~/static/dataApi";
import { DxPopup } from "devextreme-vue/popup";
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    popupRegSetting,
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxButton,
    Header
  },
  props: {
    documentRegistry: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let {
      name,
      id,
      documentRegisterResponsibleId
    } = this.documentRegistry.data;
    return {
      dataSource: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.RegistrationSetting,
          removeUrl: dataApi.docFlow.RegistrationSetting
        }),
        filter: ["documentRegisterId", "=", id]
      },
      dataGridRefKey: "dataGrid",
      documentRegisterId: id,
      documentRegisterResponsibleId,
      popupFormOpen: false,
      regSettingId: null
    };
  },
  computed: {
    dataGrid: function() {
      return this.$refs[this.dataGridRefKey].instance;
    },
    allowAdding() {
      return this.canOperateWithRegistrationSettings("allowCreating");
    },
    allowUpdating() {
      return this.canOperateWithRegistrationSettings("allowUpdating");
    },
    allowDeleting() {
      return this.canOperateWithRegistrationSettings("allowDeleting");
    }
  },
  methods: {
    canOperateWithRegistrationSettings(permission) {
      const employeeId = this.$store.getters["permissions/employeeId"];
      if (this.$store.getters["permissions/IsAdmin"]) return true;
      if (
        !this.$store.getters[`permissions/${permission}`](
          EntityType.RegistrationSetting
        )
      )
        return false;
      if (
        this.documentRegisterResponsibleId == employeeId ||
        !this.documentRegisterResponsibleId
      )
        return true;
      return false;
    },
    showPopupForm(e) {
      this.regSettingId = e.row.key;
      this.popupFormOpen = true;
    },
    hidePopup() {
      this.dataGrid.refresh();
      this.popupFormOpen = false;
    },
    onToolbarPreparing(e) {
      const addButton = e.toolbarOptions.items.find(btn => {
        return btn.name == "addRowButton";
      });
      if (addButton) {
        addButton.options.onClick = () => {
          this.popupFormOpen = true;
        };
      }
    }
  }
};
</script>
