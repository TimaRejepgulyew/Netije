<template>
  <div>
    <DxPopup
      :show-title="false"
      :visible.sync="isCardOpened"
      ref="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <document-card
          v-if="isCardOpened"
          @onSaved="valueChanged"
          @onClose="togglePopupCard"
          :isCard="true"
          :documentId="documentId"
        />
      </div>
    </DxPopup>
    <DxSelectBox
      ref="employee"
      :read-only="readOnly"
      :data-source="employeeStore"
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
      :deferRendering="true"
    >
      <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
        <DxRequiredRule />
      </DxValidator>
      <template #customSelectItem="{ data }">
        <custom-select-item :item-data="data" />
      </template>
      <template #customfield="{ data }">
        <custom-field
          @openCard="showPopup"
          :read-only="readOnly"
          @valueChanged="updateDocument"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import { load } from "~/infrastructure/services/documentService.js";
import updateCard from "~/components/employee/employee-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import customField from "~/components/employee/custom-employee-field";
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
    updateCard,
    DxPopup,
    DxButton
  },
  props: {
    dataSource: {
      type: Object,
      default: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.documentModule.AllDocument
        }),
        paginate: true,
        pageSize: 10
      })
    },
    value: {},
    isRequired: {
      type: Boolean,
      default: false
    },
    messageRequired: {
      type: String,
      default: this.$t("document.validation.documentRequired")
    },
    validatorGroup: {
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
      isCardOpened: false
    };
  },
  computed: {
    documentStore() {
      return this.dataSource;
    },
    documentId() {
      return this.valueExpr ? this.value : this.value?.id;
    }
  },
  methods: {
    async showCurrentDocument({ documentTypeGuid, id }) {
      this.$awn.asyncBlock(
        load({ documentTypeGuid, id }),
        () => {},
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
    }
  }
};
</script>

<style></style>
