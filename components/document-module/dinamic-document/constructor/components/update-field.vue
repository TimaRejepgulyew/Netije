<template>
  <form @submit.prevent="saveAndRender">
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :form-data="currentField"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="1"
    >
      <DxGroupItem :caption="$t('dinamicDocuments.captions.updateField')">
        <DxButtonItem horizontalAlignment="left" :buttonOptions="saveButtonOptions" />
        <DxSimpleItem
          data-field="editorType"
          editorType="dxSelectBox"
          :editorOptions="editorTypeOptions"
          :isRequired="true"
        >
          <DxLabel :text="$t('dinamicDocuments.updateField.editorType')" />
        </DxSimpleItem>
        <DxGroupItem v-if="!isUpdating" :items="fieldSetting" />
      </DxGroupItem>
    </DxForm>
  </form>
</template>

<script>
// import EditorTypes from "../../infrastructure/models/EditorTypes";

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";

import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
import editorTypes, {
  getDefaultEditorType,
  getFieldSettingByEditorType
} from "../../infrastructure/factory/EditorTypes.factory";

export default {
  props: {
    fieldIndex: {},
    storeId: {}
  },
  watch: {
    fieldIndex: {
      handler: function(value) {
        if (value) {
          this.currentField = {
            ...DinamicTypeControler.getElementById(this, this.storeId, value)
          };
          console.log(this.currentField);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      isUpdating: false,
      fieldSetting: getFieldSettingByEditorType(
        this,
        "constructor",
        "DxDateBox"
      ),
      editorTypes: editorTypes(this, "constructor"),
      currentField: {
        dateType: "Date",
        editorType: "EmployeeBox",
        colSpan: 2,
        dataField: "Сотрудник",
        translationTk: "tukmentçe",
        translationRu: "Русский"
      }
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel,
    DxButtonItem
  },

  computed: {
    saveButtonOptions() {
      return {
        useSubmitBehavior: true,
        icon: "save",
        text: this.$t("dinamicDocuments.buttons.saveAndRender")
      };
    },
    editorTypeOptions() {
      return {
        onSelectionChanged: e => {
          // if (e.selectedItem?.dataSource !== this.fieldSetting)
          this.isUpdating = true;
          this.fieldSetting = e.selectedItem?.dataSource;
          this.isUpdating = false;
        },
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        isRequired: true
      };
    }
  },
  methods: {
    saveAndRender() {
      DinamicTypeControler.changeElement(this, this.storeId, this.currentField);
    }
  }
};
</script>

<style>
</style>