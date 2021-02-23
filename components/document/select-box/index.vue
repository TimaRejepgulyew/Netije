<template>
  <div>
    <DxSelectBox
      ref="document"
      @opened="onOpened"
      :read-only="readOnly"
      :data-source="documentStore"
      @valueChanged="valueChanged"
      :showClearButton="showClearButton"
      :value="value"
      :openOnFieldClick="false"
      :focusStateEnabled="false"
      :valueExpr="valueExpr"
      displayExpr="name"
      :searchEnabled="true"
      searchExpr="name"
      :paginate="true"
      :page-size="10"
      item-template="customSelectItem"
      field-template="customfield"
    >
      <DxValidator v-if="isRequired" :validation-group="validationGroup">
        <DxRequiredRule :messageRequired="messageRequired" />
      </DxValidator>
      <template #customSelectItem="{ data }">
        <custom-select-item :item-data="data" />
      </template>
      <template #customfield="{ data }">
        <custom-field
          @focusIn="focusIn"
          @openFields="openFields"
          @openGrid="showDocumentGrid"
          @openCard="showDocumentCard"
          :read-only="readOnly"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import { load } from "~/infrastructure/services/documentService.js";
import { DxButton } from "devextreme-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/document/components/list-item.vue";
import customField from "~/components/document/components/input-field.vue";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import QuickFilter from "~/infrastructure/constants/quickFilter/documentQuiсkFilter";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customSelectItem,
    customField,
  },
  props: {
    dataSourceFilter: {},
    dataSourceQuery: {
      type: Number,
      default: DocumentQuery.All,
    },
    value: {},
    isRequired: {
      type: Boolean,
      default: false,
    },
    messageRequired: {
      type: String,
    },
    validationGroup: {
      type: String,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    valueExpr: {},
    showClearButton: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      dataSourceLoaded: this.valueExpr,
      currentDocumentId: null,
      isCardOpened: false,
    };
  },
  computed: {
    documentStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Documents}${this.dataSourceQuery}/${QuickFilter.All}`,
        }),
        filter: this.dataSourceFilter || [],
        paginate: true,
        pageSize: 10,
      });
      if (this.dataSourceLoaded) {
        return dataSource;
      }
      if (this.readOnly || this.value) {
        return [];
      }
      return dataSource;
    },
    documentId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
  methods: {
    focusIn() {
      this.$emit("focusIn", this.value);
    },
    onOpened() {
      this.dataSourceLoaded = true;
    },
    openFields() {
      this.$refs["document"].instance.open();
    },
    showDocumentCard({ documentTypeGuid, id }) {
      this.$popup.documentCard(
        this,
        {
          params: { documentTypeGuid, documentId: id },
          handler: load,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "reloadStore" },
          ],
        }
      );
    },
    showDocumentGrid() {
      this.$popup.documentGrid(
        this,
        {
          documentQuery: this.dataSourceQuery,
          documentFilter: this.dataSourceFilter,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "updateDocument" },
          ],
          showLoadingPanel: false,
        }
      );
      this.onOpened();
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
    reloadStore() {
      this.$refs["document"].instance.repaint();
      this.documentStore?.reload();
    },
    updateDocument(data) {
      this.reloadStore();
      if (this.valueExpr) this.$emit("valueChanged", data[this.valueExpr]);
      else this.$emit("valueChanged", data);
      this.$refs["document"].instance.repaint();
    },
  },
};
</script>

<style></style>
