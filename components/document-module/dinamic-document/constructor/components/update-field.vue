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
    </DxGroupItem>
  </DxForm>
</template>

<script>
// import EditorTypes from "../../infrastructure/models/EditorTypes";
import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
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
  },

  computed: {
    editorTypeOptions() {
      return {
        onSelectionChanged: (e) => {
          console.log(e.selectedItem);
          console.log(this);
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