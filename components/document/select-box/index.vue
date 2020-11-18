<template>
  <div>
    <DxPopup
      :show-title="false"
      :visible.sync="isCardOpened"
      ref="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      width="90%"
      height="95%"
    >
      <div class="scrool-auto">
        <document-card
          v-if="isCardOpened"
          @onSaved="valueChanged"
          @onClose="togglePopupCard"
          :isCard="true"
          :documentId="currentDocumentId"
        />
      </div>
    </DxPopup>
    <DxSelectBox
      ref="document"
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
          :dataSourceFilter="dataSourceFilter"
          :dataSourceQuery="dataSourceQuery"
          @openCard="showCurrentDocument"
          :read-only="readOnly"
          @valueChanged="updateDocument"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import { load } from "~/infrastructure/services/documentService.js";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/document/components/list-item.vue";
import customField from "~/components/document/components/input-field.vue";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customSelectItem,
    customField,
    documentCard: () =>
      import("~/components/document-module/main-doc-form/index.vue"),
    DxPopup,
    DxButton
  },
  props: {
    dataSourceFilter: {},
    dataSourceQuery: {
      type: Number,
      default: DocumentQuery.All
    },
    value: {},
    isRequired: {
      type: Boolean,
      default: false
    },
    messageRequired: {
      type: String
    },
    validationGroup: {
      type: String
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    valueExpr: {},
    showClearButton: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentDocumentId: null,
      isCardOpened: false
    };
  },
  computed: {
    documentStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Documents}${this.dataSourceQuery}`
        }),
        filter: this.dataSourceFilter || [],
        paginate: true,
        pageSize: 10
      });
    },
    documentId() {
      return this.valueExpr ? this.value : this.value?.id;
    }
  },
  methods: {
    async showCurrentDocument({ documentTypeGuid, id }) {
      this.$awn.asyncBlock(
        load(this, { documentTypeGuid, documentId: id }),
        () => {
          this.currentDocumentId = id;
          this.togglePopupCard();
        },
        () => {
          this.$awn.alert();
        }
      );
    },

    togglePopupCard() {
      this.isCardOpened = !this.isCardOpened;
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
    updateDocument(data) {
      if (this.valueExpr) this.$emit("valueChanged", data[this.valueExpr]);
      else this.$emit("valueChanged", data);
      this.documentStore.reload();
      this.$refs["document"].instance.repaint();
    }
  }
};
</script>

<style></style>
