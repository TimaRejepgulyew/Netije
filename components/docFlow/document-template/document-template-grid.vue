<template>
  <main>
    <Header
      :showTitle="!isCard"
      :headerTitle="$t('document.headers.documentTemplate')"
      :isbackButton="!isCard"
    />
    <DxDataGrid
      id="gridContainer"
      :show-borders="true"
      :data-source="store"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="false"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif')
      }"
      :onRowDblClick="selected"
      @toolbar-preparing="onToolbarPreparing($event)"
      :focused-row-enabled="false"
    >
      <DxGrouping :auto-expand-all="false" />
      <DxSelection />
      <DxHeaderFilter :visible="true" />

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />

      <DxFilterRow :visible="true" />

      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
        :file-name="$t('document.headers.documentTemplate')"
      />

      <DxStateStoring :enabled="true" type="localStorage" storage-key="document-template" />
      <DxEditing :allow-adding="false" :useIcons="true" mode="popup" />

      <DxSearchPanel position="after" :visible="true" />
      <DxScrolling mode="virtual" />
      <DxColumn data-field="name" :caption="$t('document.fields.name')"></DxColumn>
      <DxColumn data-field="modified" data-type="date" :caption="$t('document.fields.modified')"></DxColumn>
      <DxColumn data-field="authorId" :caption="$t('document.fields.authorId')">
        <!-- <DxLookup
          :allow-clearing="true"
          :data-source="employeeSource"
          value-expr="id"
          display-expr="name"
        />-->
      </DxColumn>
      <DxColumn data-field="description" :caption="$t('document.fields.description')"></DxColumn>
    </DxDataGrid>
  </main>
</template>
<script>
import ColumnFactory from "~/infrastructure/factory/documentGridColumnsFactory.js";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import documentIcon from "~/components/page/document-icon";
import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxExport,
  DxSelection,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxButton
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { createDocument } from "~/infrastructure/services/documentService.js";
export default {
  components: {
    documentIcon,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxExport,
    DxSelection,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton,
    Header
  },
  props: ["isCard"],
  data() {
    return {
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.documentTemplate.Documents
        }),
        paginate: true,
        pageSize: 10
      }),
      employeeSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: true,
        pageSize: 10
      })
    };
  },
  methods: {
    selected(e) {
      this.$emit("selected", { id: e.key });
    },
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.store.reload();
          }
        }
      });
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "plus",
          onClick: () => {
            this.$awn.asyncBlock(
              createDocument(this, {
                documentTypeGuid: DocumentTypeGuid.DocumentTemplate
              }),
              ({ documentTypeGuid, documentId }) => {
                this.$router.push(
                  `/docFlow/document-template/detail/${documentId}`
                );
              },
              () => {
                this.$awn.alert();
              }
            );
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.dx-row.dx-data-row.dx-column-lines {
  -webkit-user-select: none;
}
.dx-row.dx-data-row.dx-column-lines:hover {
  color: forestgreen;
}
</style>
