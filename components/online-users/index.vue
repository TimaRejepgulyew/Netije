<template>
  <DxDataGrid
    id="gridContainer"
    :errorRowEnabled="false"
    :show-borders="true"
    :data-source="onlineUsersStore"
    :remote-operations="false"
    @toolbar-preparing="onToolbarPreparing($event)"
  >
    <DxHeaderFilter :visible="true" />
    <DxGroupPanel :visible="true" />
    <DxGrouping :auto-expand-all="false" />
    <DxExport
      :enabled="true"
      :allow-export-selected-data="true"
      :file-name="$t('onlineUsers.fileName')"
    />
    <DxFilterRow :visible="true" />

    <DxHeaderFilter :visible="true" />

    <DxColumnChooser :enabled="true" />
    <DxColumnFixing :enabled="true" />

    <DxStateStoring
      :enabled="true"
      type="localStorage"
      storage-key="onlineUsers"
    />
    <DxSearchPanel position="after" :visible="true" />
    <DxEditing
      :allow-updating="false"
      :allow-deleting="false"
      :allow-adding="false"
      :useIcons="true"
      mode="row"
    ></DxEditing>

    <DxScrolling mode="virtual" />
    <DxColumn type="buttons">
      <DxButton
        icon="trash"
        :hint="$t('buttons.diactivate')"
        :onClick="diactivateUser"
      ></DxButton>
    </DxColumn>
    <DxColumn
      data-field="userId"
      data-type="string"
      :caption="$t('onlineUsers.fields.userId')"
    ></DxColumn>
    <DxColumn
      data-field="name"
      data-type="string"
      :caption="$t('onlineUsers.fields.name')"
    ></DxColumn>
    <DxColumn
      data-field="name"
      data-type="string"
      :caption="$t('onlineUsers.fields.description')"
    ></DxColumn>
  </DxDataGrid>
</template>

<script>
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
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
    DxGrouping,
    DxGroupPanel,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  data() {
    return {
      onlineUsersStore: this.$dxStore({
        key: "userId",
        loadUrl: dataApi.activeUser.GetActiveUsers
      })
    };
  },

  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.onlineUsersStore.reload();
          }
        }
      });
    },
    diactivateUser(e) {
      console.log(e);
    }
  }
};
</script>
