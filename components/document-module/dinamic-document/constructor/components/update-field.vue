<template>
  <DxForm
    :scrolling-enabled="true"
    ref="form"
    :form-data="currentField"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :col-count="1"
  >
    <DxGroupItem :caption="$t('dinamicDocuments.captions.updateField')">
      <DxSimpleItem
        dataField="editorType"
        editorType="dxSelectBox"
        :editorOptions="editorTypeOptions"
        :isRequired="true"
      >
        <DxLabel :text="$t('dinamicDocuments.updateField.editorType')" />
      </DxSimpleItem>
      <DxGroupItem v-if="!isUpdating" :items="fieldSetting" />
      <DxButtonItem
        name="save"
        itemType="tabbed"
        verticalAlignment="top"
        :buttonOptions="saveButtonOptions"
      />
    </DxGroupItem>
  </DxForm>
</template>

<script>
// import EditorTypes from "../../infrastructure/models/EditorTypes";
import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import editorTypes, {
  getDefaultEditorType,
  getFieldSettingByEditorType,
} from "../../infrastructure/factory/EditorTypes.factory";

export default {
  props: {
    fieldIndex: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      isUpdating: false,
      fieldSetting: getDefaultEditorType(this, "constructor").dataSource,
      editorTypes: editorTypes(this, "constructor"),
      currentField: {
        dateType: "Date",
        editorType: "EmployeeBox",
        colSpan: 2,
        dataField: "Сотрудник",
        translationTk: "tukmentçe",
        translationRu: "Русский",
      },
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel,
    DxButtonItem,
  },

  computed: {
    editorTypeOptions() {
      return {
        onSelectionChanged: (e) => {
          // if (e.selectedItem?.dataSource !== this.fieldSetting)
          this.isUpdating = true;
          this.fieldSetting = e.selectedItem?.dataSource;
          this.isUpdating = false;
        },
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        isRequired: true,
      };
    },
  },
};
</script>

<style>
</style>